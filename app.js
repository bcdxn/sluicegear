'use strict';

var http = require('http'),
    server = require('./server');

if (!module.parent) {
  http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server started listening on port: ' + server.get('port'));
  });
}