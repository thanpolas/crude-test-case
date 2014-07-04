/*
 * crude-test-case
 * The test case of the crude package
 * https://github.com/thanpolas/crude-test-case
 *
 * Copyright (c) 2014 Thanasis Polychronakis
 * Licensed under the MIT license.
 */

/**
 * @fileOverview crude-test-case Base.
 */

var testCase = module.exports = {};

var srcCrude = null;

/**
 * DI the crude package.
 *
 * @param {crude} crude The crude package.
 */
testCase.setCrude = function (crude) {
  srcCrude = crude;
  testCase.expressApp.setCrude(crude);
  testCase.UserCtrl.setCrude(crude);
};

testCase.db = require('./lib/db.lib');
testCase.libUser = require('./lib/fixture-user.lib');
testCase.tester = require('./lib/tester.lib');
testCase.Web = require('./lib/web.lib');

testCase.fixUser = require('./fixtures/user.fix');

testCase.bootstrap = require('./setup/bootstrap');
testCase.Database = require('./setup/database');
testCase.expressApp = require('./setup/expressApp');
testCase.UserCtrl = require('./setup/user.ctrl');
testCase.UserEnt = require('./setup/user.ent');
testCase.UserMongoose = require('./setup/user.mongoose.model');

