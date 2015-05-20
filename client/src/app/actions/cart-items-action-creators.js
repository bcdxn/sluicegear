var Dispatcher           = require('../dispatcher'),
    CartItemsActionTypes = require('../constants/cart-items-constants').ActionTypes;

module.exports = {
  addItem: function (item) {
    Dispatcher.dispatch({
      type: CartItemsActionTypes.ADD_ITEM,
      newItem: item
    });
  },
  removeItem: function (itemId) {
    Dispatcher.dispatch({
      type: CartItemsActionTypes.REMOVE_ITEM,
      itemId: itemId
    });
  }
};