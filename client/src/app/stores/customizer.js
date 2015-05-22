var Dispatcher   = require('../dispatcher'),
    assign       = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    CustomizerConstants    = require('../constants/customizer'),
    _customBuild = {
      model:          CustomizerConstants.Models.DOUBLE,
      primaryColor:   CustomizerConstants.Colors.RED,
      secondaryColor: CustomizerConstants.Colors.BLUE,
      includeStraps:  true
    },
    CustomizerStore;

function _setHammockModel(hammockModel) {
  _customBuild.model = hammockModel;
  
  if (hammockModel != CustomizerConstants.Models.DOUBLE) {
    _customBuild.secondaryColor = null;
  } else {
    if (_customBuild.primaryColor === CustomizerConstants.Colors.RED) {
      _customBuild.secondaryColor = CustomizerConstants.Colors.BLUE;
    } else {
      _customBuild.secondaryColor = CustomizerConstants.Colors.RED;
    }
  }
}

function _setPrimaryColor(color) {
  _customBuild.primaryColor = color;
  if (_customBuild.primaryColor === _customBuild.secondaryColor) {
    if (_customBuild.primaryColor === CustomizerConstants.Colors.RED) {
      _customBuild.secondaryColor = CustomizerConstants.Colors.BLUE;
    } else {
      _customBuild.secondaryColor = CustomizerConstants.Colors.RED;
    }
  }
}

function _setSecondaryColor(color) {
  _customBuild.secondaryColor = color;
  if (_customBuild.primaryColor === _customBuild.secondaryColor) {
    if (_customBuild.secondaryColor === CustomizerConstants.Colors.RED) {
      _customBuild.primaryColor = CustomizerConstants.Colors.BLUE;
    } else {
      _customBuild.primaryColor = CustomizerConstants.Colors.RED;
    }
  }
}

CustomizerStore = assign({}, EventEmitter.prototype, {
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
    
CustomizerStore.dispatchToken = Dispatcher.register(function(action) {
  console.log('action: ' + action.type);
  switch(action.type) {
    case CustomizerConstants.ActionTypes.SET_MODEL:
      _setHammockModel(action.model);
      CustomizerStore.emitChange();
      break;
    case CustomizerConstants.ActionTypes.SET_PRIMARY_COLOR:
      _setPrimaryColor(action.primaryColor);
      CustomizerStore.emitChange();
      break;
    case CustomizerConstants.ActionTypes.SET_SECONDARY_COLOR:
      _setSecondaryColor(action.secondaryColor);
      CustomizerStore.emitChange();
      break;
    case CustomizerConstants.ActionTypes.SET_INCLUDE_STRAPS:
      _customBuild.includeStraps = action.includeStraps;
      CustomizerStore.emitChange();
      break;
    default:
      // no-op
      break;
  }
});

module.exports = CustomizerStore;