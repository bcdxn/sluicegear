'use strict';

var CustomizerConstants = {

  ActionTypes: {
    SET_MODEL:           'SET_MODEL',
    SET_PRIMARY_COLOR:   'SET_PRIMARY_COLOR',
    SET_SECONDARY_COLOR: 'SET_SECONDARY_COLOR',
    SET_INCLUDE_STRAPS:  'SET_INCLUDE_STRAPS'
  },
  
  Models: {
    SINGLE: 'Single',
    DOUBLE: 'Double',
    HAMMIE: 'Hammie'
  },
  
  Colors: {
    RED:       'Red',
    BLUE:      'Blue',
    TAN:       'Tan',
    BURGUNDY:  'Burgundy',
    TURQUOISE: 'Turquoise',
    BLACK:     'Black'
  },
  
  Prices: {
    SINGLE_COST: 5995,
    DOUBLE_COST: 8495,
    HAMMIE_COST: 4995,
    STRAPS_COST: 1995
  },
  
  PreviewImgTypes: {
    MAIN_HAMMOCK: 'MAIN_HAMMOCK',
    HAMMOCK_BAG:  'HAMMOCK_BAG',
    STRAPS:       'STRAPS'
  }
};

module.exports = CustomizerConstants;