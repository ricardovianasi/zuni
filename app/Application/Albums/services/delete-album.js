(function () {
  'use strict';

  angular
    .module('ZN.albums')
    .factory('DeleteAlbum', DeleteAlbum);

  DeleteAlbum.$inject = ['$http', '$q', 'BASE', 'SessionService'];

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
  function DeleteAlbum($http, $q, BASE, SessionService) {
    return function (id) {
      var deferred = $q.defer();

      $http.delete(BASE.url + '/album/' + id, {
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




