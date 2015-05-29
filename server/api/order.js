'use strict';

var Q         = require('q'),
    HttpCode  = require('../common/http-code'),
    Util      = require('../common/util'),
    PayPalApi = require('./paypal'),
    Email     = require('./email');

module.exports = function (server) {
  var OrderApi          = {},
      Dao               = server.get('Dao'),
      SHIPPING_PRICE    = 1000,
      FREE_SHIPPING_MIN = 20000;
  
  Dao.Model.Picklist.find({
    'where': {
      'type': 'CONSTANTS',
      'key': 'SHIPPING_PRICE'
    },
    'plain': true
  }).then(function (shippingPrice) {
    if  (shippingPrice) {
      SHIPPING_PRICE = parseInt(shippingPrice.value);
    }
  });
  
  Dao.Model.Picklist.find({
    'where': {
      'type': 'CONSTANTS',
      'key': 'FREE_SHIPPING_MIN'
    },
    'plain': true
  }).then(function (shippingMin) {
    if  (shippingMin) {
      FREE_SHIPPING_MIN = parseInt(shippingMin.value);
    }
  });
  
  /**
   * Create an order.
   * 
   * Example newOrder object
   * ```
   * {
   *   "paymentMethod": "paypal",
   *   "items": [{ "sku": "..." }, {"sku": "..." }],
   *   "coupon": {
   *     "code": "...",
   *     "minimumPrice": 5000,
   *     "percentDiscount": 0,
   *     "fixedDiscount": 1000,
   *     "freeShipping": false
   *   }
   * }
   * ```
   * 
   * @param  {Object}         newOrder The new order to create
   * @return {Promise<Order>}          The newly created order
   */
  OrderApi.create = function (newOrder) {
    var deferred = Q.defer(),
        productPromises = [];
    
    // Check that the order in the request body exists
    if (!newOrder) {
      deferred.reject({
        code: HttpCode.BadRequest.CODE,
        message: 'No order given.'
      });
      return deferred.promise;
    }
    
    // Check that a payment method is specified and that it a supported method
    if (!newOrder.paymentMethod || newOrder.paymentMethod !== 'paypal') {
      deferred.reject({
        code: HttpCode.BadRequest.CODE,
        message: 'Invalid payment method specified.'
      });
      return deferred.promise;
    }
    
    // Check that the coupon is in the correct format if one is provied
    if (newOrder.coupon && !newOrder.coupon.code) {
      deferred.reject({
        code: HttpCode.BadRequest.CODE,
        message: 'Invalid coupon object. A coupon code must be provided.'
      });
      return deferred.promise;
    }
    
    // Check that there are items in the order
    if (!newOrder.items || !Util.isArray(newOrder.items) || newOrder.items.length < 1) {
      deferred.reject({
        code: HttpCode.BadRequest.CODE,
        message: 'Your order was malformed. There were no items in the order.'
      });
      return deferred.promise;
    }
    
    // Look up all items in the order by SKU
    newOrder.items.forEach(function (orderItem) {
      productPromises.push(Dao.Model.Product.find({
        where: { 'sku': orderItem.sku }
      }));
    });
    
    // Check that each item we looked up mapped back to a product
    Q.allSettled(productPromises).then(function (settledProductPromises) {
      var productsDeferred = Q.defer(),
          plainProducts    = [];
      
      settledProductPromises.forEach(function (productPromise) {
        if (!productPromise.value || productPromise.state !== 'fulfilled') {
          productsDeferred.reject({
            code:    HttpCode.BadRequest.CODE,
            message: 'Your order was malformed. One or more of the products was not available.'
          });
        } else {
          plainProducts.push(productPromise.value.get());
        }
      });
      
      productsDeferred.resolve(plainProducts);
      
      return productsDeferred.promise;
    }).then(function (products) {
      // Now Check the coupon if one was provided
      var couponDeferred = Q.defer();
      
      if (!newOrder.coupon) {
        couponDeferred.resolve({ 'products': products });
      } else {
        Dao.Model.Coupon.find({
          where: { 'code': newOrder.coupon.code }
        }).then(function (coupon) {
          if (!coupon) {
            couponDeferred.reject({
              code:    HttpCode.BadRequest.CODE,
              message: 'Your order was malformed. An invalid coupon code was supplied.'
            });
          } else {
            couponDeferred.resolve({ 'products': products, 'coupon': coupon});
          }
        });
      }
      
      return couponDeferred.promise;
    }).then(function (validatedOrder) {
      var products = validatedOrder.products,
          coupon   = validatedOrder.coupon,
          order    = {},
          items    = [];
      
      order.itemsTotalPrice = 0;
      order.shippingPrice   = SHIPPING_PRICE;
      order.salesTax        = 0;
      order.adjustment      = 0;
      order.paymentMethod   = newOrder.paymentMethod;
      
      products.forEach(function (product) {
        order.itemsTotalPrice += product.price;
      });
      
      if (order.itemsTotalPrice >= FREE_SHIPPING_MIN) {
        order.shippingPrice = 0;
      }
      
      if (coupon) {
        if (order.itemsTotalPrice >= coupon.minimumPrice && coupon.freeShipping){
          order.shippingPrice = 0;
        }
        
        if (order.itemsTotalPrice >= coupon.minimumPrice){
          if (coupon.percentDiscount) {
            order.adjustment = -1 * coupon.percentDiscount * order.itemsTotalPrice;
          } else if (coupon.fixedDiscount) {
            order.adjustment = -1 * coupon.fixedDiscount;
          }
        }
      }
      
      PayPalApi.createPayment({
        'total': ((order.itemsTotalPrice + order.shippingPrice + order.adjustment + order.salesTax) / 100).toFixed(2),
        'subtotal': ((order.itemsTotalPrice + order.adjustment) / 100).toFixed(2),
        'tax': (order.salesTax / 100).toFixed(2),
        'shipping': (order.shippingPrice / 100).toFixed(2),
        'description': shortDescription(newOrder, (order.itemsTotalPrice + order.shippingPrice + order.adjustment + order.salesTax))
      }).then(function (payment) {
        Dao.Model.Order.create(order).then(function (savedOrder) {
          products.forEach(function (product) {
            items.push({ 'ProductId': product.id, 'OrderId': savedOrder.get('id') });
          });
          
          Dao.Model.OrderItem.bulkCreate(items).then(function () {
            savedOrder.update({ 'paymentId': payment.paymentId }).then(function () {
              return Dao.Model.Order.find({
                'where': { 'id':  savedOrder.id },
                'include': [{
                  'model': Dao.Model.OrderItem,
                  'include': [{ 'model': Dao.Model.Product }]
                }]
              });
            }).then(function (order) {
              var plainOrder = order.get();
              
              plainOrder.approvalUrl = payment.approvalUrl;
              
              deferred.resolve(plainOrder);
            }).catch(function (err) {
              // TODO: HANDLE ERROR
              console.log(err);
              deferred.reject({
                code: HttpCode.InternalServerError.CODE,
                message: 'Unable to update order with PayPayl paymentId'
              });
            });
            
          }).catch(function (err) {
            console.log(err);
            deferred.reject({
              code: HttpCode.InternalServerError.CODE,
              message: 'Error saving items'
            });
          });
        });
      }).catch(function (err) {
        // TODO: HANDLE ERROR
        console.log(err);
        deferred.reject({
          code: HttpCode.InternalServerError.CODE,
          message: 'Error communicating with PayPal'
        });
      });
    }).catch(function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };
  
  /**
   * Find a specific order. For now we will use the paypal id to
   * find payment records.
   * 
   * @param {String}           paymentId The payment id from the paypal api
   * @param {Promise<Payment>}           The payment object
   */
  OrderApi.read = function (paymentId) {
    var deferred = Q.defer();
    
    console.log(paymentId)
    
    Dao.Model.Order.find({
      'where':   { 'paymentId': paymentId },
      'attributes': ['itemsTotalPrice', 'shippingPrice', 'salesTax', 'adjustment', 'paymentMethod', 'paymentId', 'paymentReceived', 'CouponId'],
      'include': [{
          'model': Dao.Model.OrderItem,
          'attributes': ['personalization'],
          'include': [{
            'model': Dao.Model.Product,
            'attributes': ['sku', 'name', 'description', 'price'],
            'include': [{
              'model': Dao.Model.ProductAttribute,
              'attributes': ['key', 'value']
            }]
          }]
        },
        {
          'model': Dao.Model.Coupon
        }]
    }).then(function (order) {
      if (order) {
        deferred.resolve(order.get());
      } else {
        deferred.reject({
          code: HttpCode.NotFound.CODE,
          message: 'No payment information found.'
        });
      }
    }).catch(function (err) {
      deferred.reject(err);
    });
    
    return deferred.promise;
  };
  
  /**
   * All fields on an order are immutable except for payment details.
   * Therefore an update on an order is used to change the payment state
   * 
   * @param  {String}         paymentId The payment id from the paypal api
   * @param  {String}         payerId   The payer id from the paypal api
   * @return {Promise<Order>}           The updated order
   */
  OrderApi.update = function (paymentId, payerId) {
    var deferred = Q.defer();
    
    OrderApi.read(paymentId).then(function (order) {
      if (order) {
        PayPalApi.executePayment(paymentId, payerId).then(function (paymentInfo) {
          Dao.Model.Order.update(
            { paymentReceived: true },
            { 'where': {'paymentId': paymentId } }
          ).then(function () {
            var emailContent = paymentInfo;
            // We know it's paid although when we grabbed it from the DB it was not
            order.paymentReceived = true;
            emailContent.cart = order;
            emailContent.coupons = order.Coupon;
            
            Email.sendSellerNotification(emailContent);
            deferred.resolve(order);
          });
        }).catch(function (err) {
          if (!err.code) {
            // TODO: HANDLE ERROR
            console.log(err);
            deferred.reject({
              code: HttpCode.InternalServerError.CODE,
              message: 'Error updating payment status in database.'
            });
          } else {
            deferred.reject(err);
          }
        });
      } else {
        deferred.reject({
          code: HttpCode.NotFound.CODE,
          message: 'Order not found'
        });
      }
    }).catch(function (err) {
      console.log('outer catch')
      if (!err.code) {
        // TODO: HANDLE ERROR
        console.log(err);
        deferred.reject({
          code: HttpCode.InternalServerError.CODE,
          message: 'Error updating payment status in database.'
        });
      } else {
        deferred.reject(err);
      }
    });
    
    return deferred.promise;
  };
  
  return OrderApi;
};

function shortDescription(order, totalPrice) {
  return order.items.length + ((order.items.length > 1)
    ? (' items')
    : (' item')) +
     ' -- $' + (totalPrice / 100).toFixed(2);
}