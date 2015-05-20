var Dispatcher      = require('../dispatcher'),
    CartActionTypes = require('../constants/cart-constants').ActionTypes;

module.exports = {
  showCart: function () {
    Dispatcher.dispatch({
      type: CartActionTypes.SHOW_CART
    });
  },
  hideCart: function () {
    Dispatcher.dispatch({
      type: CartActionTypes.HIDE_CART
    });
  }
};