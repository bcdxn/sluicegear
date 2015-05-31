'use strict';

var Q        = require('q'),
    HttpCode = require('../common/http-code');

module.exports = function (server) {
  var Coupon = {},
      Dao    = server.get('Dao');
  
  /**
   * Fetch the coupon by coupon-code.
   * 
   * @param  {String}          code The picklist type
   * @return {Promise<Coupon>}      The matching coupon
   */
  Coupon.read = function (code) {
    var deferred = Q.defer(),
        query    = { active: true };
    
    if (!code) {
      deferred.reject({
        code:    HttpCode.BadRequest.CODE,
        message: 'You must provide a coupon code in the query.'
      });
      return deferred.promise;
    } else {
      query.code = code.toUpperCase();
    }
    
    Dao.Model.Coupon.find({
      'attributes': ['code', 'minimumPrice', 'percentDiscount', 'fixedDiscount', 'freeShipping'],
      'where': query,
      'plain': true
    }).then(function (coupon) {
      deferred.resolve(coupon);
    }).catch(function (err) {
      console.log(err);
      deferred.reject({
        code:    HttpCode.InternalServerError.CODE,
        message: HttpCode.InternalServerError.MESSAGE
      });
    });
    
    return deferred.promise;
  };
  
  return Coupon;
};