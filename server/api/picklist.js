'use strict';

var Q        = require('q'),
    HttpCode = require('../common/http-code');

module.exports = function (server) {
  var PicklistApi = {},
      Dao         = server.get('Dao');
  
  /**
   * Fetch the picklist values optionally filtered by type.
   * 
   * @param  {String}                  [type] The picklist type
   * @return {Promise<Array<Picklist>>}       The array of matching picklist entries
   */
  PicklistApi.read = function (type) {
    var deferred = Q.defer(),
        query    = { active: true };
    
    if (type) {
      query.type = type;
    }
    
    Dao.Model.Picklist.findAll({
      'attributes': ['type', 'key', 'value', 'label'],
      'where': query
    }).then(function (picklist) {
      var plainPicklist = [];
      
      picklist.forEach(function (entry) {
        plainPicklist.push(entry.values);
      });
      
      deferred.resolve(plainPicklist);
    }).catch(function (err) {
      console.log(err);
      deferred.reject({
        code:    HttpCode.InternalServerError.CODE,
        message: HttpCode.InternalServerError.MESSAGE
      });
    });
    
    return deferred.promise;
  };
  
  return PicklistApi;
};