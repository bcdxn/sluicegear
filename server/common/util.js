'use strict';

var Util = {};

Util.isArray = function (ary) {
   return Object.prototype.toString.call( ary ) === '[object Array]';
};

module.exports = Util;