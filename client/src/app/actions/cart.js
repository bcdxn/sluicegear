var Dispatcher    = require('../dispatcher'),
    CartConstants = require('../constants/cart');

var CartActions = {
  showCart: function () {
    Dispatcher.dispatch({
      type: CartConstants.SHOW_CART
    });
  },
  hideCart: function () {
    Dispatcher.dispatch({
      type: CartConstants.HIDE_CART
    });
  },
  addItem: function (item) {
    Dispatcher.dispatch({
      type: CartConstants.ADD_ITEM,
      newItem: item
    });
  },
  removeItem: function (itemId) {
    Dispatcher.dispatch({
      type: CartConstants.REMOVE_ITEM,
      itemId: itemId
    });
  }
};

module.exports = CartActions;