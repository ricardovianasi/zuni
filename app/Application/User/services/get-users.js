(function () {
  'use strict';

  angular
    .module('ZN.user')
    .factory('GetUsers', GetUsers);

  GetUsers.$inject = ['$http', '$q', 'BASE', 'SessionService', 'AuthService'];

  function GetUsers($http, $q, BASE, SessionService, AuthService) {
    return function (id) {
      var deferred = $q.defer();

      $http.get(BASE.url + '/user', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          deferred.resolve(res.users);

          if (res.user)
            AuthService.setUser(res.user);
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
}());
