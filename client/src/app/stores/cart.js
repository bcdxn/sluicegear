var Dispatcher     = require('../dispatcher'),
    CartConstants  = require('../constants/cart'),
    assign         = require('object-assign'),
    EventEmitter   = require('events').EventEmitter,
    $              = require('jquery'),
    Cookies        = require('js-cookie'),
    _cartItems     = [],
    _isCartVisible = false,
    CartStore;

/**
 * Add the given item to the cart item store.
 * 
 * @param {Object} item The item to add
 */
function _addCartItem(item) {
  item.id = 'ci_' + item.sku + '_' + Date.now();
  _cartItems.push(item);
  Cookies.set('cartItemHistory', _cartItems, { expires: 7, path: '/' });
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
  
  Cookies.set('cartItemHistory', _cartItems, { expires: 7, path: '/' });
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
  
  initialize: function (){
    Cookies.json = true;
    _cartItems = Cookies.get('cartItemHistory') || [];
    this.emitChange();
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
      _addCartItem(assign({}, action.newItem));
      CartStore.emitChange();
      break;
    
    case CartConstants.ActionTypes.REMOVE_ITEM:
      _removeCartItem(action.itemId);
      CartStore.emitChange();
      break
    
    case CartConstants.ActionTypes.SHOW_CART:
      _showCart();
      CartStore.emitChange();
      $('html').addClass('freeze-page-size');
      $('body').addClass('freeze-page-size');
      break;
    
    case CartConstants.ActionTypes.HIDE_CART:
      _hideCart(action.itemId);
      CartStore.emitChange();
      $('html').removeClass('freeze-page-size');
      $('body').removeClass('freeze-page-size');
      break
    
    default:
      // no-op
      break;
  }
});

CartStore.initialize();

module.exports = CartStore;