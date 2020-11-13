(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('Hints', Hints);

  Hints.$inject = ['$rootScope'];

  /**
   * @param $rootScope
   *
   * @returns {{toggle: toggle, choose: choose, filter: filter}}
   *
   * @constructor
   */
  function Hints($rootScope) {
    return {
      /**
       * @param model
       */
      toggle: function (model) {
        $rootScope.$emit('hints-toggle', model);
      },
      /**
       * @param data
       */
      choose: function (data) {
        $rootScope.$emit('hints-choose', data);
      },
      /**
       * @param data
       */
      filter: function (data) {
        $rootScope.$emit('hints-filter', data);
      }
    }
  }
}());
