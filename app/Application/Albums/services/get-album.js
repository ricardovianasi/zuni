(function () {
  'use strict';

  angular
    .module('ZN.albums')
    .factory('GetAlbum', GetAlbum);

  GetAlbum.$inject = ['$http', '$q', 'BASE', 'CropImage', 'SessionService', 'AuthService'];

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
  function GetAlbum($http, $q, BASE, CropImage, SessionService, AuthService) {
    return function (id) {
      var deferred = $q.defer();

      $http.get(BASE.url + '/image', {
          params: {
            idAlbum: id
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          var photos = CropImage('450x450', res.images, 'thumbnail_url');

          deferred.resolve({
            album: res.album,
            photos: photos
          });

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
