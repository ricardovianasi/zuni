(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('DeleteGroup', DeleteGroup);

  DeleteGroup.$inject = ['$http', '$q', 'BASE', 'SessionService'];

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
  function DeleteGroup($http, $q, BASE, SessionService) {
    return function (id) {
      var deferred = $q.defer();

      $http.delete(BASE.url + '/group/' + id, {
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
