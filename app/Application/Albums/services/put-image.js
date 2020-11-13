(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('PutImage', PutImage);

  PutImage.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param Serialize
   * @param SessionService
   *
   * @returns {Function}
   *
   * @constructor
   */
  function PutImage($http, $q, BASE, Serialize, SessionService) {
    return function (requestObject, albumID) {
      var deferred = $q.defer(),
        imageObject;

      imageObject = Serialize(requestObject);

      $http.put(BASE.url + '/album/' + albumID, imageObject, {
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
