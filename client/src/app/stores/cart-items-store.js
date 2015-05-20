var Dispatcher    = require('../dispatcher'),
    CartConstants = require('../constants/cart-constants'),
    assign        = require('object-assign'),
    EventEmitter  = require('events').EventEmitter,
    _cartItems    = [],
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
  console.log('called _removeCartItem(' + id + ')')
  _cartItems = _cartItems.filter(function (item) {
    return item.id !== id;
  });
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

  get: function(id) {
    return _cartItems[id];
  },

  getAll: function() {
    return _cartItems;
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
    
    default:
      // no-op
      break;
  }
});

module.exports = CartStore;