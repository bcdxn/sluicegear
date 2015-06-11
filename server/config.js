/// <reference path="../typings/node/node.d.ts"/>
'use strict';

var path           = require('path'),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    compression    = require('compression'),
    cookieParser   = require('cookie-parser'),
    methodOverride = require('method-override'),
    serveStatic    = require('serve-static'),
    session        = require('express-session'),
    Config         = {};

/* Config Constants
--------------------------------------------------------------------------------*/

// App Versioning
Config.VERSION = '3.0.4';
// App Server Config
Config.PORT            = process.env.PORT            || 1337;
Config.VIEW_DIR        = process.env.VIEW_DIR        || 'views';
Config.VIEW_ENGINE     = process.env.VIEW_ENGINE     || 'jade';
Config.NODE_ENV        = process.env.NODE_ENV        || 'development';
Config.LOGGER_MODE     = process.env.LOGGER_MODE     || Config.NODE_ENV;
Config.STATIC_DIR      = process.env.STATIC_DIR      || path.join('..', 'client', 'public');
Config.CACHE_TIME      =  process.env.CACHE_TIME     || ((process.env.NODE_ENV === 'production') ? 86400000 : 1);
Config.SESSION_SECRET  = process.env.SESSION_SECRET  || '0123456789qwerty';
Config.SLUICE_ROOT_URL = process.env.SLUICE_ROOT_URL || 'http://192.168.1.70';//'http://localhost';
// PayPal Config
Config.SLUICE_PP_HOST          = process.env.SLUICE_PP_HOST;
Config.SLUICE_PP_PORT          = process.env.SLUICE_PP_PORT;
Config.SLUICE_PP_CLIENT_ID     = process.env.SLUICE_PP_CLIENT_ID;
Config.SLUICE_PP_CLIENT_SECRET = process.env.SLUICE_PP_CLIENT_SECRET;
Config.SLUICE_PP_MODE          = process.env.SLUICE_PP_MODE || 'sandbox';
// Mandrill Email Service Config
Config.SLUICE_MANDRILL_API_KEY          = process.env.SLUICE_MANDRILL_API_KEY;
Config.SLUICE_SELLER_NOTIFICATION_EMAIL = process.env.SLUICE_SELLER_NOTIFICATION_EMAIL;
// DB Config
Config.DB_USER    = process.env.DB_USER    || 'dev-user';
Config.DB_PASS    = process.env.DB_PASS    || '';
Config.DB_HOST    = process.env.DB_HOST    || 'localhost';
Config.DB_PORT    = process.env.DB_PORT    || 5432;
Config.DB_NAME    = process.env.DB_NAME    || 'dev-db';
Config.DB_DIALECT = process.env.DB_DIALECT || 'sqlite';
Config.DB_STORAGE = process.DB_STORAGE     || path.join(__dirname, 'database', 'dev', Config.DB_NAME + '.db');

/**
 * Configure the Express server settings.
 * 
 * @param {Object} server The Express server to configure
 */
Config.initServer = function (server) {
  server.set('port', Config.PORT)
        .set('views', path.join(__dirname, Config.VIEW_DIR))
        .set('view engine', Config.VIEW_ENGINE)
        .use(compression())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ 'extended': true }))
        .use(methodOverride())
        .use(serveStatic(path.join(__dirname, Config.STATIC_DIR),
          { maxAge: Config.CACHE_TIME }))
        .use(cookieParser())
        .use(session({
          'resave': true,
          'saveUninitialized': true,
          'secret': Config.SESSION_SECRET
        }))
        .use(morgan([':date',':status',':remote-addr',':method',':url',':response-time'].join(' | ')));
};

module.exports = Config;