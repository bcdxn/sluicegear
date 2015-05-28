'use strict';

var Config = require('../config');

module.exports = function (server, router) {
  
  /* API Routes
  ------------------------------------------------------------------------------------*/
  router.get('/api', function (req, res) {
    res.status(200).json({ 'message': 'Welcome to the Sluicegear API' });
  });
  
  require('./product')(server.get('Api'), router); // Product API Routes
  require('./picklist')(server.get('Api'), router); // Picklist API Routes
  require('./coupon')(server.get('Api'), router); // Coupon API Routes
  require('./order')(server.get('Api'), router) // Order API Routes
  
  /* Page Routes
  ------------------------------------------------------------------------------------*/
  router.get('/', function (req, res) {
    res.render('landing', { version: Config.VERSION });
  });
  
  router.get('/shop', function (req, res) {
    res.render('shop', { version: Config.VERSION });
  });
  
  router.get('/about', function (req, res) {
    res.render('about', { version: Config.VERSION });
  });
  
  server.use(router);
};