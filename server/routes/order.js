'use strict';

var HttpCode = require('../common/http-code');

module.exports = function (Api, router) {
  router.route('/api/Order')
    .post(function(req, res) {
      // Create an order
      Api.Order.create(req.body).then(function (order) {
        res.status(HttpCode.Created.CODE).json(order);
      }).catch(function (err) {
        if (err.code) {
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
  
  router.route('/api/Order/:orderId')
    .put(function(req, res) {
      // Update an order (execute)
      
    });
};