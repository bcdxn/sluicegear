'use strict';

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    SET_MODEL:            null,
    SET_PRIMARY_COLOR:    null,
    SET_SECONDARY_COLOR:  null,
    SET_INCLUDE_STRAPS:   null
  }),
  
  Models: {
    SINGLE: 'Single',
    DOUBLE: 'Double',
    HAMMIE: 'Hammie'
  },
  
  Colors: {
    RED: 'Red',
    BLUE: 'Blue',
    TAN: 'Tan',
    BURGUNDY: 'Burgundy',
    TURQUOISE: 'Turquoise',
    BLACK: 'Black'
  },
  
  Prices: {
    SINGLE_COST: 5995,
    DOUBLE_COST: 8495,
    HAMMIE_COST: 4995,
    STRAPS_COST: 1995
  }
};
