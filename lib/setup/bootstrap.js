/**
 * @fileOverview Boot stub environment.
 */

var util = require('util');

var Promise = require('bluebird');

var expressApp = require('./expressApp');
var Database = require('./database');
var database = new Database();

var app = module.exports = {};

/** @type {null|Express} The express instance */
app.express = null;

var initialized = false;

/**
 * Master bootstrap.
 *
 * @param {boolean} withDb Set to true to boot up the DB too.
 * @return {Promise} A dissaster.
 */
app.init = Promise.method(function(withDb) {
  if (initialized) {
    // Don't boot DB, only express
    return expressApp.init();
  }
  initialized = true;

  console.log('app.init() :: Booting stub application...');

  // Global exception handler
  process.on('uncaughtException', app.onNodeFail);

  var prom = Promise.resolve();
  if (withDb) {
    prom = database.init();
  }

  return prom
    .then(expressApp.init);
});

/**
 * Catch-all for all unhandled exceptions
 *
 * @param {Error} err An error object.
 */
app.onNodeFail = function(err) {
  console.error('onNodeFail() :: Unhandled Exception. Error:', util.inspect(err), err);
  process.exit(1);
};
