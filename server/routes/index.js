'use strict';

module.exports = function (server, router) {
  router.get('/api', function (req, res) {
    res.status(200).json({ 'message': 'Welcome to the Sluicegear API' });
  });
  
  require('./product')(server.get('Api'), router); // Product API Routes
  require('./picklist')(server.get('Api'), router); // Picklist API Routes
  require('./coupon')(server.get('Api'), router); // Coupon API Routes
  require('./order')(server.get('Api'), router) // Order API Routes
  
//  router.get('*', function (req, res) {
//    res.status(200).json({'wat': 'wat'});
//  });
  
  server.use(router);
};