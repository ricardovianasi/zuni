(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('GetProfiles', GetProfiles);

  GetProfiles.$inject = ['$http', '$q', 'BASE', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param SessionService
   *
   * @returns {Function}
   *
   * @constructor
   */
  function GetProfiles($http, $q, BASE, SessionService) {
    return function (id) {
      var deferred = $q.defer();

      $http.get(BASE.url + '/profile', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          deferred.resolve(res.profiles);
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
}());
