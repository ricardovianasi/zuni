(function () {
  'use strict';

  angular
    .module('ZN.albums')
    .factory('GetAlbums', GetAlbums);

<<<<<<< HEAD
  GetAlbums.$inject = ['$http', '$q', 'BASE', 'CropImage', 'AuthService', 'SessionService'];
=======
  GetAlbums.$inject = ['$http', '$q', 'BASE', 'CropImage', 'SessionService', 'AuthService'];
>>>>>>> develop

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param CropImage
<<<<<<< HEAD
   * @param AuthService
   * @param SessionService
=======
   * @param SessionService
   * @param AuthService
>>>>>>> develop
   *
   * @returns {Function}
   *
   * @constructor
   */
<<<<<<< HEAD
  function GetAlbums($http, $q, BASE, CropImage, AuthService, SessionService) {
=======
  function GetAlbums($http, $q, BASE, CropImage, SessionService, AuthService) {
>>>>>>> develop
    return function () {

      var deferred = $q.defer();

      $http.get(BASE.url + '/album', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          var photos = CropImage('350x350', res.albums, 'cover');

          if (res.user)
            AuthService.setUser(res.user);

          deferred.resolve(photos);
        })
        .error(function (error) {
          deferred.reject(error)
        });

      return deferred.promise;
    }
  }
}());
