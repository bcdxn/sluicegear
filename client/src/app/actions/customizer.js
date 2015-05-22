var Dispatcher          = require('../dispatcher'),
    Customizerconstants = require('../constants/customizer');

module.exports = {
  setHammockModel: function (model) {
    Dispatcher.dispatch({
      'type': Customizerconstants.ActionTypes.SET_MODEL,
      'model': model
    });
  },
  setPrimaryColor: function (color) {
    Dispatcher.dispatch({
      'type': Customizerconstants.ActionTypes.SET_PRIMARY_COLOR,
      'primaryColor': color
    });
  },
  setSecondaryColor: function (color) {
    Dispatcher.dispatch({
      'type': Customizerconstants.ActionTypes.SET_SECONDARY_COLOR,
      'secondaryColor': color
    });
  },
  setIncludeStraps: function (includeStraps) {
    Dispatcher.dispatch({
      'type': Customizerconstants.ActionTypes.SET_INCLUDE_STRAPS,
      'includeStraps': includeStraps
    });
  }
};