var Dispatcher     = require('../dispatcher'),
    assign         = require('object-assign'),
    EventEmitter   = require('events').EventEmitter,
    OrderConstants = require('../constants/order'),
    _order         = {},
    OrderStore;

function _getOrder(paymentId, callback) {
  $.get('/api/Order/' + paymentId, function (result) {
    _order = result;
    callback();
  });
};

OrderStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },
  
  getOrderItems: function () {
    var items = [];
    
    if (_order.OrderItems) {
      _order.OrderItems.forEach(function (item) {
        items.push(item.Product);
      });
    }
    
    return items;
  },
  
  getItemsTotalPrice: function () {
    return _order.itemsTotalPrice;
  },
  
  getShippingPrice: function () {
    return _order.shippingPrice;
  },
  
  getSalesTax: function () {
    return _order.salesTax;
  },
  
  getAdjustment: function () {
    return _order.adjustment;
  }
});

OrderStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case OrderConstants.ActionTypes.GET_ORDER:
      _getOrder(action.paymentId, function () {
        OrderStore.emitChange();
      });
      break;
    default:
      // no-op
      break;
  }
});

module.exports = OrderStore;