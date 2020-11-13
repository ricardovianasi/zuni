(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('GetUser', GetUser);

  GetUser.$inject = ['$http', '$q', 'BASE', 'CropImage', 'SessionService', 'AuthService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param CropImage
   * @param SessionService
   * @param AuthService
   *
   * @returns {Function}
   *
   * @constructor
   */
  function GetUser($http, $q, BASE, CropImage, SessionService, AuthService) {
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
          var user = CropImage('200x200', res.user, 'avatar_url');

          deferred.resolve(user);

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
