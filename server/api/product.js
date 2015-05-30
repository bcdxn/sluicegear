'use strict';

var Q        = require('q'),
    Crypto   = require('crypto'),
    HttpCode = require('../common/http-code');

module.exports = function (server) {
  var ProductApi = {},
      Dao        = server.get('Dao');
  
  /**
   * Fetch the product reord from the database that matches the given id.
   * If no id is given, return all product records. Only available
   * products are fetched by default.
   * 
   * @param  {Number}                  [id] The product id used for DB lookup
   * @return {Promise<Array<Product>>}      The array of matching products
   */
  ProductApi.read = function (id) {
    var deferred = Q.defer(),
        query    = { available: true };
    
    if (id) {
      query.id = id;
    }
    
    Dao.Model.Product.findAll({
      'attributes': ['id', 'sku', 'uuid', 'name', 'description', 'price'],
      'include': [{
        'attributes': ['key', 'value'],
        'model': Dao.Model.ProductAttribute
      }],
      'where': query
    }).then(function (products) {
      var plainProducts = [];
      
      products.forEach(function (product) {
        var plainProduct = product.values,
            attrVals     = ['','','','',''];
        
        plainProduct.ProductAttributes.forEach(function (attr) {
          if (attr.key === 'type') {
            attrVals[0] = attr.value;
          } else if (attr.key === 'model') {
            attrVals[1] = attr.value;
          } else if (attr.key === 'primaryColor') {
            attrVals[2] = attr.value;
          } else  if (attr.key === 'secondaryColor') {
            attrVals[3] = attr.value;
          } else if (attr.key === 'size') {
            attrVals[4] = attr.value;
          }
        });
        // Create hash of attributes for quick sku mapping in UI
        // md5(type|model|primaryColor|secondaryColor|size)
        plainProduct.hash = Crypto.createHash('md5')
                                  .update(attrVals.join('|').toLowerCase())
                                  .digest('hex');
        
        plainProducts.push(plainProduct);
      });
      
      deferred.resolve(plainProducts);
    }).catch(function (err) {
      console.log(err);
      deferred.reject({
        code:    HttpCode.InternalServerError.CODE,
        message: HttpCode.InternalServerError.MESSAGE
      });
    });
    
    return deferred.promise;
  };
  
  return ProductApi;
};