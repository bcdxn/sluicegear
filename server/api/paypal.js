var paypal    = require('paypal-rest-sdk'),
    Q         = require('q'),
    Config    = require('../config'),
    HttpCode  = require('../common/http-code'),
    PaypalApi = {};

paypal.configure({
  'host':          Config.SLUICE_PP_HOST,
  'port':          Config.SLUICE_PP_PORT,
  'client_id':     Config.SLUICE_PP_CLIENT_ID,
  'client_secret': Config.SLUICE_PP_CLIENT_SECRET,
  'mode':          Config.SLUICE_PP_MODE
});

/**
 * Create a PayPal payment object using the given transaction details. The
 * payment is not executed until explicitly requested by the executePayment
 * API call.
 * 
 * Example transaction details object:
 * {
 *   "subtotal":    0.00,
 *   "tax":         0.00,
 *   "shipping":    0.00,
 *   "total":       0.00,
 *   "description": "..."
 * }
 * 
 * @param  {Object}                  details The transaction details
 * @return {Promise<PayPalPayment>}          The PayPal API payment object
 */
PaypalApi.createPayment = function (details) {
  var deferred = Q.defer(),
      port     = '',
      paypalPayment = {
        'intent': 'sale',
        'payer': {
          'payment_method': 'paypal'
        },
        'redirect_urls': { },
        'transactions': [{
          'amount': {
            'details': {}
          }
        }]
      };
      
  // Add payment info to request
  paypalPayment.transactions[0].amount.total            = details.total;
  paypalPayment.transactions[0].amount.currency         = 'USD';
  paypalPayment.transactions[0].amount.details.subtotal = details.subtotal;
  paypalPayment.transactions[0].amount.details.tax      = details.tax;
  paypalPayment.transactions[0].amount.details.shipping = details.shipping;
  paypalPayment.transactions[0].description             = details.description;
  
  if (process.env.NODE_ENV !== 'production') {
    port = ':' + Config.PORT;
  }
  
  // Add approved callback url to the request body
  paypalPayment.redirect_urls.return_url = Config.SLUICE_ROOT_URL + port +
    '/#/shop?checkout=approve';
  // Add canceled callback url to the request body
  paypalPayment.redirect_urls.cancel_url = process.env.SLUICE_ROOT_URL + port + '/';
  
  // Create payment with paypal API
  paypal.payment.create(paypalPayment, {}, function (err, resp) {
    var paymentId,
        approvalUrl,
        retError = {},
        links,
        i;

    if (err) {
      // TODO: HANDLE ERROR
      console.log(err);
      deferred.reject(retError);
    } else {
      paymentId = resp.id;
      links     = resp.links;

     console.log('paypal - createPayment - payment created ' + paymentId);

      for (i = 0; i < links.length; i++) {
        if (links[i].rel === 'approval_url') {
          approvalUrl = links[i].href;
        }
      }
      
      console.log('APPROVAL: ' + approvalUrl);

      deferred.resolve({
        'paymentId': paymentId,
        'approvalUrl': approvalUrl
      });
    }
  });

  return deferred.promise;
};

/**
 * Execute a PayPal payment identified by payment id.
 * 
 * @param  {String}         paymentId The PayPal payment ID from PayPal REST API
 * @param  {String}         payerId   The PayPal payerId from PayPal REST API
 * @return {Promise<Order>}           The corresponding order for the given paymentID
 */
PaypalApi.executePayment = function (paymentId, payerId) {
  var deferred = q.defer(),
      payer = {
        payer_id: payerId
      };
  // Finalize Payment with paypal API
  paypal.payment.execute(paymentId, payer, {}, function (err, resp) {
    var retError = {};

    if (err) {
      console.log(err);

      if (err.response.name === 'PAYMENT_STATE_INVALID') {
        retError.code = HttpCode.Conflict.CODE;
        retError.message = 'The order has already been placed and approved.';
      } else {
        console.log(err);
        retError.code = HttpCode.InternalServerError.CODE;
        retError.message = HttpCode.InternalServerError.MESSAGE;
      }
      
      deferred.reject(retError);
    } else {
      deferred.resolve({});
    }
  });

  return deferred.promise;
};


module.exports = PaypalApi;