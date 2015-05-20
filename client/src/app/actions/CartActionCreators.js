var Dispatcher  = require('../dispatcher'),
    ActionTypes = require('../constants/cart-constants').ActionTypes;

module.exports = {
  addItem: function (item) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_ITEM,
      newItem: item
    });
  },
  removeItem: function (itemId) {
    Dispatcher.dispatch({
      type: ActionTypes.REMOVE_ITEM,
      itemId: itemId
    });
  }
};