(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('CopyImageService', CopyImageService);

  CopyImageService.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

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
  function CopyImageService($http, $q, BASE, Serialize, SessionService) {
    return function (idAlbum, idImage) {
      var deferred = $q.defer(),
        data;

      data = Serialize({
        idAlbum: idAlbum,
        idImage: idImage
      });

      $http.post(BASE.url + '/image/copy', data, {
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
