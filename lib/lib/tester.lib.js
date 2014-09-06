/**
 * @fileOverview Main testing helper lib, exporting fixtures, helper functions
 *   etc. All tests must require it.
 */
var Promise = require('bluebird');

var boot = require('../setup/bootstrap');

var tester = module.exports = {};

tester.setup = null;
tester.teardown = null;

if (global.setup) {
  tester.setup = setup;
  tester.teardown = teardown;
} else {
  tester.setup = beforeEach;
  tester.teardown = afterEach;
}

// global setup
var init = false;

/**
 * Boot application.
 *
 * @param {boolean} withDb Set to true to boot up the DB too.
 */
tester.init = function(withDb) {
  tester.setup(function(done) {
    tester.initActual(withDb).then(done.bind(null, null), done);
  });
};

/**
 * The actual app init method
 *
 * @param {boolean} withDb Set to true to boot up the DB too.
 * @return {Promise} A promise.
 */
tester.initActual = Promise.method(function(withDb) {
  if (init) {
    return;
  }
  init = true;

  return boot.init(withDb);
});

/**
 * Have a Cooldown period between tests.
 *
 * @param {number} seconds cooldown in seconds.
 * @return {Function} use is beforeEach().
 */
tester.cooldown = function(seconds) {
  return function(done) {
    setTimeout(done, seconds);
  };
};

/** @type {RegExp} Test an ISO8601 type date */
tester.reIso8601 = /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([+-]{1}\d{2}:\d{2})|Z)??)??$/;
