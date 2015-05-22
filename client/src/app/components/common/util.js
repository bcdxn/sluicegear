var MD5 = require('MD5');

var Util = {
  /**
   * Generate the md5 hash of the hammock properties
   * so that we can quickly map a build to a sku.
   * 
   * @param  {Object} customBuild The current custom built hammock
   * @return {String}             The md5 hash of build properties
   */
  getBuildHash: function (customBuild) {
    var attrVals     = ['','','','',''];
    
    attrVals[0] = 'hammock';
    attrVals[1] = customBuild.model;
    attrVals[2] = customBuild.primaryColor;
    attrVals[3] = customBuild.secondaryColor;
    
    return MD5(attrVals.join('|').toLowerCase());
  }
};


module.exports = Util;