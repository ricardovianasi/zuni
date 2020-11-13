(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('GetGroups', GetGroups);

  GetGroups.$inject = ['$http', '$q', 'BASE', 'SessionService'];

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
  function GetGroups($http, $q, BASE, SessionService) {
    return function (id) {
      var deferred = $q.defer();

      $http.get(BASE.url + '/group', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          deferred.resolve(res.groups);
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
}());
