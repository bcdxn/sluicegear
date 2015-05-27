var Dispatcher     = require('../dispatcher'),
    OrderConstants = require('../constants/order');

var OrderActions = {
  getOrder: function (paymentId) {
    Dispatcher.dispatch({
      'type': OrderConstants.ActionTypes.GET_ORDER,
      'paymentId': paymentId
    });
  }
};

module.exports = OrderActions;