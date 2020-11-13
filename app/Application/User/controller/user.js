(function () {
  'use strict';

  angular.module('ZN.user')
    .controller('UserController', UserController);

  UserController.$inject = ['User'];

  /**
   * @param User
   *
   * @constructor
   */
  function UserController(User) {
    console.log('... UserController');

    //View model namespace
    var vm = this;
    vm.user = User;
  }
}());
