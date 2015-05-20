var Dispatcher   = require('../dispatcher'),
    assign       = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    _colors      = [],
    ColorStore;

_colors = ['red', 'blue', 'tan', 'burgundy', 'turquoise', 'black'];

ColorStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getAll: function () {
    return _colors;
  }
});
    
ColorStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    default:
      // no-op
      break;
  }
});

module.exports = ColorStore;