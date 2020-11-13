(function () {
  'use strict';

  angular.module('ZN.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$http', '$q', 'SessionService', 'Serialize', 'BASE'];

  /**
   * @param $http
   * @param $q
   * @param SessionService
   * @param Serialize
   * @param BASE
   *
   * @returns {{login: login, isAuthenticated: isAuthenticated, isAuthorized: isAuthorized, setUser: setUser, logout: logout}}
   *
   * @constructor
   */
  function AuthService($http, $q, SessionService, Serialize, BASE) {
    console.log('... AuthService');

    var cachePermission = [];

    return {
      /**
       * @param credentials
       * @param persist
       *
       * @returns {deferred.promise|{then, catch, finally}}
       */
      login: function (credentials, persist) {
        var deferred = $q.defer();

        $http.post(BASE.url + '/auth/login', Serialize(credentials), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
          })
          .success(function (user) {
            /**
             * Save the token
             */
            if (persist) {
              SessionService.set(user.token, true);
            } else {
              SessionService.set(user.token, false);
            }

            deferred.resolve(user);
          })
          .error(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      },
      /**
       * @returns {boolean}
       */
      isAuthenticated: function () {
        return !!SessionService.get();
      },
      /**
       * @param feat
       * @param action
       *
       * @returns {boolean}
       */
      isAuthorized: function (feat, action) {
        var roles = SessionService.roles();
        var hasAction = false;

        //Test if user is an administrator
        if (roles === true) {
          return true;
        }

        if (roles) {
          if (roles[feat]) {
            var i = 0;

            //Verify if action has in cache
            if (cachePermission.indexOf(action) !== -1) {
              return true;
            }

            for (i; i < roles[feat].length; i++) {
              var roleAction = roles[feat][i].value;

              if (action === roleAction) {
                cachePermission.push(roleAction);
                hasAction = true;

                break;
              }
            }
          }

          return hasAction;
        }

        return false;
      },
      /**
       * @param user
       */
      setUser: function (user) {
        SessionService.setCurrentUser(user.name);
        SessionService.roles(user.has_administrator_profile || user.list_permissions);
        SessionService.setUserGroups(user.groups);
      },
      /**
       * @returns {deferred.promise|{then, catch, finally}}
       */
      logout: function () {
        var deferred = $q.defer();

        $http.post(BASE.url + '/auth/logout', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
          })
          .success(function (user) {
            /**
             * Remove the token
             */
            SessionService.destroy();
            deferred.resolve(user);
          })
          .error(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      }
    }
  }
}());
