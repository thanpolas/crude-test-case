# crude-test-case

> The test case of the [crude package](https://github.com/thanpolas/crude).

Beware, this is for internal use by crude and plugins.

[![Build Status](https://secure.travis-ci.org/thanpolas/crude-test-case.png?branch=master)](http://travis-ci.org/thanpolas/crude-test-case)

## Install

Install the module using NPM:

```
npm install crude-test-case --save
```

## Overview

Quick hands on:

```js
var testlib = require('crude-test-case');
testlib.setCrude(require('crude'));

var tester = testlib.tester;
var Web = testlib.Web;

describe('Create OPs', function() {
  this.timeout(5000);

  // Init but not with DB
  tester.init(false);

  /* ... */
});

The `tester.init()` method accepts one argument, a boolean indicating weather the DB should be initialized too.


The following modules are exposed:

#### Tester Libs

    * `db` Database helpers (`db.nuke()`).
    * `libUser` Setups and teardowns user records to test against (`libUser.createUser()`).
    * `tester` Generic tester bootstrap library, required by all tests.
    * `web` Supertest initializer.

#### Fixtures

    * `fixUser` User fixtures.

#### Stub Express App

    * `bootstrap` The stub express application bootstrap file.
    * `Database` Connection manager.
    * `expressApp` The express application module.
    * `UserCtrl` The user crude controller.
    * `UserEnt` The user entity.
    * `UserMongoose` The user mongoose model.

**[[⬆]](#TOC)**

## Release History

- **v0.0.5**, *23 Jul 2015*
    - Upgrade all dependencies to latest.
- **v0.0.4**, *06 Sep 2014*
    - Make express app rebootable.
    - Express 4.0 compat.
- **v0.0.3**, *06 Sep 2014*
    - Stub booting of User Controller and Entity, boot only Express App Bare.
- **v0.0.2**, *04 Jul 2014*
    - bug fixes
- **v0.0.1**, *04 Jul 2014*
    - Big Bang

## License

Copyright (c) 2014 Thanasis Polychronakis. Licensed under the MIT license.
