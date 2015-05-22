var Dispatcher   = require('../dispatcher'),
    assign       = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    _products    = [],
    ProductStore;

ProductStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  
  initialLoad: function () {
    var self = this;
    $.get('/api/Product', function (result) {
      _products = result;
      self.emitChange();
    });
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
    
ProductStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    default:
      // no-op
      break;
  }
});

ProductStore.initialLoad();

module.exports = ProductStore;