var Dispatcher   = require('../dispatcher'),
    assign       = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    _colors      = [],
    PickListStore;

_colors = ['Red', 'Blue', 'Tan', 'Burgundy', 'Turquoise', 'Black'];

PickListStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getAllColors: function () {
    return _colors;
  }
});
    
PickListStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    default:
      // no-op
      break;
  }
});

module.exports = PickListStore;