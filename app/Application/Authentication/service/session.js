(function () {
  'use strict';

  angular.module('ZN.auth')
    .factory('SessionService', SessionService);

  SessionService.$inject = ['$cookies', '$rootScope'];

  /**
   * @param $cookies
   * @param $rootScope
   *
   * @returns {{set: set, get: get, destroy: destroy, roles: roles, setCurrentUser: setCurrentUser, setUserGroups: setUserGroups}}
   *
   * @constructor
   */
  function SessionService($cookies, $rootScope) {
    var token_access = {};

    return {
      /**
       * @param token
       * @param saveAccess
       */
      set: function (token, saveAccess) {
        var exp_date = new Date();

        if (token && saveAccess) {
          exp_date.setDate(exp_date.getDate() + 2);
          $cookies.put('znTokenAccess', token, {expires: exp_date});
          token_access.token = $cookies.get('znTokenAccess');
        } else if (token) {
          exp_date.setMinutes(exp_date.getMinutes() + 60);
          $cookies.put('znSessionTokenAccess', token, {expires: exp_date});
          token_access.token = $cookies.get('znSessionTokenAccess');
          token_access = {
            token: token,
            access: true
          };
        }
        //return false;
      },
      /**
       * @returns {{}}
       */
      get: function () {
        var cookie_token = $cookies.get('znTokenAccess');
        var session_token_access = $cookies.get('znSessionTokenAccess');

        if (cookie_token) {
          token_access.token = cookie_token;

          return token_access;
        }

        if (session_token_access) {
          token_access.token = session_token_access;

          return token_access;
        }

        if (token_access) {
          return token_access;
        }
      },
      destroy: function () {
        $cookies.remove('znTokenAccess');
        $cookies.remove('znSessionTokenAccess');
        token_access = {};
      },
      /**
       * @param roles
       *
       * @returns {*}
       */
      roles: function (roles) {
        if (roles) {
          $rootScope.userRoles = roles;
        }

        return $rootScope.userRoles;
      },
      /**
       * @param user
       */
      setCurrentUser: function (user) {
        if (user) {
          $rootScope.currentUser = user;
        } else {
          $rootScope.currentUser = 'UFMG';
        }
      },
      /**
       * @param groups
       */
      setUserGroups: function (groups) {
        if (groups) {
          $rootScope.userGroups = groups;
        }
      }
    }
  }
}());
