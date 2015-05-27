'use strict';

var HttpCode = require('../common/http-code'),
    Config   = require('../config');

module.exports = function (Api, router) {
  // Get coupon with matching coupon code
  router.route('/api/Coupon')
    .get(function(req, res) {
      Api.Coupon.read(req.query.code).then(function (coupon) {
        if (coupon) {
          res.status(200).json(coupon);
        } else {
          res.status(HttpCode.NotFound.CODE).json({
            code: HttpCode.NotFound.CODE,
            message: 'Coupon not found'
          });
        }
      }).catch(function (err) {
        if (err.code || Config.NODE_ENV === 'development') {
          res.status(err.code).json(err);
        } else {
          console.log(err);
          // TODO: HANDLE ERROR
          res.status(HttpCode.InternalServerError.CODE)
             .json({
               code: HttpCode.InternalServerError.CODE,
               message: HttpCode.InternalServerError.MESSAGE
             });
        }
      });
    });
};