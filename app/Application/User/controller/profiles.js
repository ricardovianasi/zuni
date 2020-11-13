(function () {
  'use strict';

  angular.module('ZN.user')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['Profiles', '$filter'];

  /**
   * @param Profiles
   * @param $filter
   *
   * @constructor
   */
  function ProfileController(Profiles, $filter) {
    console.log('... ProfileController');

    var vm = this;
    var orderBy = $filter('orderBy');

    vm.profiles = Profiles;

    /**
     * @param predicate
     * @param e
     */
    vm.order = function (predicate, e) {
      var button = angular.element(e.target);

      if (button.hasClass('active')) {
        vm.profiles = orderBy(vm.profiles, predicate, true);
        button.removeClass('active');
      } else {
        vm.profiles = orderBy(vm.profiles, predicate, false);
        button.addClass('active');
      }
    };

    /**
     * @param groupName
     *
     * @returns {string}
     */
    vm.formatPermissions = function (groupName) {
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
