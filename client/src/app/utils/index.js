var MD5 = require('MD5');

var Utils = {
  /**
   * Generate the md5 hash of the hammock properties
   * so that we can quickly map a build to a sku.
   * 
   * @param  {Object} customBuild The current custom built hammock
   * @return {String}             The md5 hash of build properties
   */
  getHammockHash: function (customBuild) {
    var attrVals = ['','','','',''];
    
    attrVals[0] = 'hammock';
    attrVals[1] = customBuild.model;
    attrVals[2] = customBuild.primaryColor;
    attrVals[3] = customBuild.secondaryColor;
    
    return MD5(attrVals.join('|').toLowerCase());
  },
  
  /**
   * Generate the md5 hash of the straps so that we can
   * quickly map the straps to a sku.
   * 
   * @param {String} [model]    Either 'standard' or 'auxillary' defaults to 'standard'
   * @param {String} [color]  The color of the straps defaults to 'black'
   * @param {String} [length] The length of the straps defaults to '7 feet'
   */
  getStrapsHash: function (model, color, length) {
    var attrVals = ['','','','',''];
    
    attrVals[0] = 'straps';
    attrVals[1] = model  || 'standard';
    attrVals[2] = color  || 'black';
    attrVals[4] = length || '7 feet';
    
    return MD5(attrVals.join('|').toLowerCase());
  }
};


module.exports = Utils;