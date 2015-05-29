var Dispatcher    = require('../dispatcher'),
    CartConstants = require('../constants/cart');

var CartActions = {
  showCart: function () {
    Dispatcher.dispatch({
      type: CartConstants.ActionTypes.SHOW_CART
    });
  },
  hideCart: function () {
    Dispatcher.dispatch({
      type: CartConstants.ActionTypes.HIDE_CART
    });
  },
  addItem: function (item) {
    Dispatcher.dispatch({
      type: CartConstants.ActionTypes.ADD_ITEM,
      newItem: item
    });
  },
  removeItem: function (itemId) {
    Dispatcher.dispatch({
      type: CartConstants.ActionTypes.REMOVE_ITEM,
      itemId: itemId
    });
  },
  emptyCart: function () {
    Dispatcher.dispatch({
      type: CartConstants.ActionTypes.EMPTY_CART
    });
  }
};

module.exports = CartActions;