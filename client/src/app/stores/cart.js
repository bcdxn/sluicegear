var Dispatcher     = require('../dispatcher'),
    CartConstants  = require('../constants/cart'),
    assign         = require('object-assign'),
    EventEmitter   = require('events').EventEmitter,
    _cartItems     = [],
    _isCartVisible = true,
    CartStore;
    
// TEMP
_addCartItem({'sku': 'SIN-R', 'description': 'Single-wide red hammock', 'price': 5995 });
_addCartItem({'sku': 'SIN-L', 'description': 'Double-wide blue hammock', 'price': 5995 });

/**
 * Add the given item to the cart item store.
 * 
 * @param {Object} item The item to add
 */
function _addCartItem(item) {
  item.id = 'ci_' + item.sku + '_' + Date.now();
  _cartItems.push(item);
}

/**
 * Remove the item indicated by the given id.
 * 
 * @param {String} id The id of the cart item to remove
 */
function _removeCartItem(id) {
  _cartItems = _cartItems.filter(function (item) {
    return item.id !== id;
  });
}

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
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getItem: function(id) {
    return _cartItems[id];
  },

  getAllItems: function() {
    return _cartItems;
  },

  getIsCartVisible: function () {
    return _isCartVisible;
  }
});

CartStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case CartConstants.ActionTypes.ADD_ITEM:
      _addCartItem({
        'sku':         action.newItem.sku,
        'description': action.newItem.sku,
        'price':       action.newItem.price
      });
      CartStore.emitChange();
      break;
    
    case CartConstants.ActionTypes.REMOVE_ITEM:
      _removeCartItem(action.itemId);
      CartStore.emitChange();
      break
    
    case CartConstants.ActionTypes.SHOW_CART:
      _showCart();
      CartStore.emitChange();
      break;
    
    case CartConstants.ActionTypes.HIDE_CART:
      _hideCart(action.itemId);
      CartStore.emitChange();
      break
    
    default:
      // no-op
      break;
  }
});

module.exports = CartStore;