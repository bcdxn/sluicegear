var Dispatcher   = require('../dispatcher'),
    assign       = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    Constants    = require('../constants/hammock-builder'),
    _customBuild = {
      model:          Constants.Models.DOUBLE,
      primaryColor:   Constants.Colors.RED,
      secondaryColor: Constants.Colors.BLUE,
      includeStraps:  true
    },
    BuilderStore;

function _setHammockModel(hammockModel) {
  _customBuild.model = hammockModel;
  
  if (hammockModel != Constants.Models.DOUBLE) {
    _customBuild.secondaryColor = null;
  } else {
    if (_customBuild.primaryColor === Constants.Colors.RED) {
      _customBuild.secondaryColor = Constants.Colors.BLUE;
    } else {
      _customBuild.secondaryColor = Constants.Colors.RED;
    }
  }
}

function _setPrimaryColor(color) {
  _customBuild.primaryColor = color;
  if (_customBuild.primaryColor === _customBuild.secondaryColor) {
    if (_customBuild.primaryColor === Constants.Colors.RED) {
      _customBuild.secondaryColor = Constants.Colors.BLUE;
    } else {
      _customBuild.secondaryColor = Constants.Colors.RED;
    }
  }
}

function _setSecondaryColor(color) {
  _customBuild.secondaryColor = color;
  if (_customBuild.primaryColor === _customBuild.secondaryColor) {
    if (_customBuild.secondaryColor === Constants.Colors.RED) {
      _customBuild.primaryColor = Constants.Colors.BLUE;
    } else {
      _customBuild.primaryColor = Constants.Colors.RED;
    }
  }
}

BuilderStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },
  
  getHammockModel: function () {
    return _customBuild.model;
  },
  
  getPrimaryColor: function () {
    return _customBuild.primaryColor;
  },
  
  getSecondaryColor: function () {
    return _customBuild.secondaryColor;
  },
  
  getIncludeStraps: function () {
    return _customBuild.includeStraps;
  },
  
  getCustomBuild: function () {
    return _customBuild;
  }
});
    
BuilderStore.dispatchToken = Dispatcher.register(function(action) {
  console.log('action: ' + action.type);
  switch(action.type) {
    case Constants.ActionTypes.SET_MODEL:
      _setHammockModel(action.model);
      BuilderStore.emitChange();
      break;
    case Constants.ActionTypes.SET_PRIMARY_COLOR:
      _setPrimaryColor(action.primaryColor);
      BuilderStore.emitChange();
      break;
    case Constants.ActionTypes.SET_SECONDARY_COLOR:
      _setSecondaryColor(action.secondaryColor);
      BuilderStore.emitChange();
      break;
    case Constants.ActionTypes.SET_INCLUDE_STRAPS:
      _customBuild.includeStraps = action.includeStraps;
      BuilderStore.emitChange();
      break;
    default:
      // no-op
      break;
  }
});

module.exports = BuilderStore