(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('GetPermision', GetPermision);

  GetPermision.$inject = ['$http', '$q', 'BASE', 'SessionService'];

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
  function GetPermision($http, $q, BASE, SessionService) {
    return function (id) {
      var deferred = $q.defer();

      //controller
      $http.get(BASE.url + '/action', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          deferred.resolve(res);
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
}());
