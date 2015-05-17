'use strict';

var Sequelize = require('sequelize'),
    Path      = require('path'),
    Q         = require('q'),
    Config    = require('../config');

module.exports = function (server) {
  var deferred = Q.defer(),
      Dao   = {},
      dbOpt = {};
  
  /* Configure Database Options
  ----------------------------------------------------------------------------*/
  dbOpt.dialect = Config.DB_DIALECT;
  
  if (dbOpt.dialect == 'sqlite') {
    dbOpt.storage  = Config.DB_STORAGE;
  }
  
  /* Initialize Sequelize DB
  ----------------------------------------------------------------------------*/
  Dao.DB = new Sequelize(null, Config.DB_USER, Config.DB_PASS, dbOpt);
  
  /* Configure Database Options
  ----------------------------------------------------------------------------*/
  Dao.Model = {};
  
  ['Product', 'ProductAttribute', 'Order', 'OrderItem', 'Coupon', 'Picklist'].forEach(function (modelName) {
    Dao.Model[modelName] = Dao.DB.import(Path.join(__dirname, '..', 'models',
      modelName.toLocaleLowerCase()));
  });
  
  /* Initialize Model Associations
  ----------------------------------------------------------------------------*/
  Dao.Model.Product.hasMany(Dao.Model.ProductAttribute, {});
  Dao.Model.ProductAttribute.belongsTo(Dao.Model.Product, {});
  Dao.Model.Order.hasMany(Dao.Model.OrderItem, {});
  Dao.Model.OrderItem.belongsTo(Dao.Model.Order, {});
  Dao.Model.Order.belongsTo(Dao.Model.Coupon, {});
  Dao.Model.Coupon.hasMany(Dao.Model.Order, {});
  Dao.Model.Product.hasMany(Dao.Model.OrderItem, {});
  Dao.Model.OrderItem.belongsTo(Dao.Model.Product, {});
    
  /* Sync Sequelize Models with DB
  ----------------------------------------------------------------------------*/
  Dao.DB.sync().then(function () {
    deferred.resolve(Dao);
  });
  
  server.set('Dao', Dao);
  
  return deferred.promise;
};
    