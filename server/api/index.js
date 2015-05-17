'use strict';

module.exports = function (server) {
  var Api = {};
  
  Api.Product = require('./product')(server);
  Api.Picklist = require('./picklist')(server);
  Api.Coupon = require('./coupon')(server);
  Api.Order = require('./order')(server);
  
  server.set('Api', Api);
  
  return Api;
};