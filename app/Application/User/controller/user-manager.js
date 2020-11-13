(function () {
  'use strict';

  angular.module('ZN.user')
    .controller('UserManagerController', UserManagerController);

  UserManagerController.$inject = ['User', 'Groups', '$filter'];

  /**
   * @param User
   * @param Groups
   * @param $filter
   *
   * @constructor
   */
  function UserManagerController(User, Groups, $filter) {
    console.log('... UserManagerController');

    var vm = this;
    var orderBy = $filter('orderBy');

    vm.user = User;
    vm.groups = Groups;

    /**
     * @param profile
     *
     * @returns {string}
     */
    vm.formatProfiles = function (profile) {
      var profiles = '';
      var i = 0;

      for (i; i < profile.length; i++) {
        if (i === profile.length - 1) {
          profiles += profile[i].name;
        } else {
          profiles += profile[i].name + ',';
        }
      }

      return profiles;
    };

    /**
     * @param type
     * @param list
     * @param predicate
     * @param e
     */
    vm.order = function (type, list, predicate, e) {
      var button = angular.element(e.target);

      if (button.hasClass('active')) {
        switch (type) {
          case 'user':
            vm.user = orderBy(list, predicate, true);

            break;
          case 'groups':
            vm.groups = orderBy(list, predicate, true);

            break;
        }

        button.removeClass('active');
      } else {
        switch (type) {
          case 'user':
            vm.user = orderBy(list, predicate, false);

            break;
          case 'groups':
            vm.groups = orderBy(list, predicate, false);

            break;
        }

        button.addClass('active');
      }
    };

    /**
     * @param groupName
     *
     * @returns {string}
     */
    vm.formatUsers = function (groupName) {
      var users = '';
      var i = 0;
      var g = 0;

      for (i; i < User.length; i++) {
        var groups = User[i].groups;

        for (g; g < groups.length; g++) {
          if (groups[g].name === groupName) {
            users += User[i].name + ', ';
          }
        }

        g = 0;
      }

      return users;
    }
  }
}());
