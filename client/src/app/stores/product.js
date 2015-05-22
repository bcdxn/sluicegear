var Dispatcher   = require('../dispatcher'),
    assign       = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    _products    = [],
    ProductsStore;

_products = [{ 'sku': 'SIN-R', 'hash': 'a783d1a8e90c7bcf9a26655980fb7d44'}
            ,{ 'sku': 'SIN-L', 'hash': 'f38a1abb4217c2ce2eb60ad8c3cd30b5'}];

ProductsStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getAllProducts: function () {
    return _products;
  },
  
  getProductByHash: function (hash) {
    var foundProduct = _products.filter(function (product) {
      return product.hash === hash;
    });
    
    if (foundProduct.length > 0) {
      return foundProduct[0];
    } else {
      return null;
    }
  }
});
    
ProductsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    default:
      // no-op
      break;
  }
});

module.exports = ProductsStore;