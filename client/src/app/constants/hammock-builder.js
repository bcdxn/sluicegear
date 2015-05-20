'use strict';

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    SET_MODEL:            null,
    SET_PRIMARY_COLOR:    null,
    SET_SECONDARY_COLOR:  null,
    ADD_STRAPS:           null,
    REMOVE_STRAPS:        null
  }),
  
  Models: {
    SINGLE: 'Single',
    DOUBLE: 'Double',
    HAMMIE: 'Hammie'
  }
};
