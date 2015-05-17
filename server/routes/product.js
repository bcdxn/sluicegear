'use strict';

var HttpCode = require('../common/http-code');

module.exports = function (Api, router) {
  // Get *all* products
  router.route('/api/Product')
    .get(function(req, res) {
      Api.Product.read().then(function (products) {
        res.status(200).json(products);
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
  
  // Get the product with the corresponding ID
  router.route('/api/Product/:productId')
    .get(function (req, res) {
      var id = req.params.productId;
      
      Api.Product.read(id).then(function (products) {
        if (products.length < 1) {
          res.status(HttpCode.NotFound.CODE)
             .json({
               code: HttpCode.NotFound.CODE,
               message: 'Product not found'
             });
        } else {
          res.status(HttpCode.Okay.CODE).json(products[0]);
        }
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
};