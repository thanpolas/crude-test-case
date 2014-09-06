/**
 * @fileOverview Initialize webserver services, express, routes, etc
 */
var http = require('http');

var Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');

var srcCrude = null;

var expressApp = module.exports = {};

/** @type {?express} The express instance */
expressApp.app = null;

/** @type {http} The http instance */
expressApp.http = null;

/** @type {app.core.SessionStore} Instance of Session Store */
expressApp.sessionStore = null;

/**
 * DI the crude package.
 *
 * @param {crude} crude The crude package.
 */
expressApp.setCrude = function (crude) {
  srcCrude = crude;
};


/**
 * Kick off the webserver...
 *
 * @return {Promise} a promise.
 */
expressApp.init = Promise.method(function() {
  if (expressApp.app !== null) {
    return;
  }

  var app = expressApp.app = express();

  var port = 3100;

  // Setup express
  app.set('port', port);
  app.set('view engine', 'jade');

  app.use(bodyParser.json());

  // initialize webserver
  expressApp.initWebserver(app);

  return Promise.all([
    expressApp.startWebserver(app),
  ]);
});

/**
 * Init the webserver.
 *
 * @param {Express} app the Express instance.
 */
expressApp.initWebserver = function(app) {
  expressApp.http = http.createServer(app);
};

/**
 * Start the webserver.
 *
 * @param {Express} app the Express instance.
 * @return {Promise} A promise.
 */
expressApp.startWebserver = function(app) {
  return new Promise(function(resolve, reject) {
    expressApp.http.on('clientError', function(err) {
      console.warn('startWebserver() :: Client Error. Exception:', err);
    });
    expressApp.http.on('error', function(err) {
      console.error('startWebserver() :: Failed to start web server. Exception:', err);
      reject(err);
    });

    expressApp.http.listen(app.get('port'), function(){
      console.log('startWebserver() :: Webserver launched. Listening on port: ' +
        app.get('port'));
      resolve();
    });
  });
};
