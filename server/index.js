var Config = require('./config'),
    Express = require('express'),
    server = Express(),
    Dao = require('./dao')(server),
    Api = require('./api'),
    router = Express.Router(),
    Routes = require('./routes');

Config.initServer(server);
// Must wait for Sequelize Sync before loading APIs and Routes
Dao.then(function () {
  Api(server);
  Routes(server, router);
});


module.exports = server;