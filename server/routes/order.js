'use strict';

var HttpCode = require('../common/http-code'),
    Config   = require('../config');

module.exports = function (Api, router) {
  router.route('/api/Order')
    .post(function(req, res) {
      // Create an order
      Api.Order.create(req.body).then(function (order) {
        res.status(HttpCode.Created.CODE).json(order);
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
  
  router.route('/api/Order/:paymentId')
    .get(function (req, res) {
      // Get a specific order
      Api.Order.read(req.params.paymentId).then(function (order) {
        res.status(HttpCode.Okay.CODE).json(order);
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
    })
    .put(function(req, res) {
      // Update an order (execute)
      Api.Order.update(req.params.paymentId, req.body.payerId).then(function(order) {
        res.status(200).json(order);
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