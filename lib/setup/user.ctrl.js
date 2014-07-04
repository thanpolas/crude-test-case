/**
 * @fileOverview User controller.
 */
var UserEntity = require('./user.ent');

var srcCrude = null;

var userCtrl = module.exports = {};

userCtrl.init = function() {
  /**
   * User controller, need to wrap so "crude" DI will work.
   *
   * @contructor
   * @extends {crude}
   */
  userCtrl.Ctrl = srcCrude.extendSingleton(function(){
    var opts = {
      baseUrl: '/user',
      idField: '_id',
      urlField: '_id',
      pagination: false,
      showId: true,
      noViews: true,
      dateField: 'birthdate'
    };

    this.setOptions(opts);
    this.setEntity(UserEntity.getInstance());
  });
};

/**
 * DI the crude package.
 *
 * @param {crude} crude The crude package.
 */
userCtrl.setCrude = function (crude) {
  srcCrude = crude;
};
