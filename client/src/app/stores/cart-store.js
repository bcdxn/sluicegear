var Dispatcher      = require('../dispatcher'),
    CartActionTypes = require('../constants/cart-constants').ActionTypes,
    assign          = require('object-assign'),
    EventEmitter    = require('events').EventEmitter,
    _isCartVisible = true,
    CartStore;

/**
 * Show the shopping cart.
 */
function _showCart() {
  _isCartVisible = true;
}

/**
 * Hide the shopping cart
 */
function _hideCart(id) {
  _isCartVisible = false;
}

CartStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  isCartVisible: function () {
    return _isCartVisible;
  }
});

CartStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case CartActionTypes.SHOW_CART:
      _showCart();
      CartStore.emitChange();
      break;
    
    case CartActionTypes.HIDE_CART:
      _hideCart(action.itemId);
      CartStore.emitChange();
      break
    
    default:
      // no-op
      break;
  }
});

module.exports = CartStore;