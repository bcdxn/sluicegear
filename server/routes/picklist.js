'use strict';

var HttpCode = require('../common/http-code');

module.exports = function (Api, router) {
  // Get *all* picklist entries
  router.route('/api/Picklist')
    .get(function(req, res) {
      Api.Picklist.read(req.query.type).then(function (picklist) {
        res.status(200).json(picklist);
      }).catch(function (err) {
        // TODO: HANDLE ERROR
        if (err.code) {
          res.status(err.code).json(err);
        } else {
          console.log(err);
          // TODO: HANDLE ERROR
          res.status(HttpCode.InternalServerError.CODE)
             .json({
               code: HttpCode.InternalServerError.CODE,
               message: HttpCode.InternalServerError.MESSAGE
             });
        }
      });
    });
};