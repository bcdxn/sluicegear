var Dispatcher         = require('../dispatcher'),
    BuilderActionTypes = require('../constants/hammock-builder').ActionTypes;

module.exports = {
  setHammockModel: function (model) {
    Dispatcher.dispatch({
      'type': BuilderActionTypes.SET_MODEL,
      'model': model
    });
  },
  setPrimaryColor: function (color) {
    Dispatcher.dispatch({
      'type': BuilderActionTypes.SET_PRIMARY_COLOR,
      'primaryColor': color
    });
  },
  setSecondaryColor: function (color) {
    Dispatcher.dispatch({
      'type': BuilderActionTypes.SET_SECONDARY_COLOR,
      'secondaryColor': color
    });
  },
  setIncludeStraps: function (includeStraps) {
    Dispatcher.dispatch({
      'type': BuilderActionTypes.SET_INCLUDE_STRAPS,
      'includeStraps': includeStraps
    });
  }
};