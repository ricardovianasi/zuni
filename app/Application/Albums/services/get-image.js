(function () {
  'use strict';

  angular
    .module('ZN.albums')
    .factory('GetImage', GetImage);

  GetImage.$inject = ['$http', '$q', 'BASE', 'CropImage', 'AuthService', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param CropImage
   * @param AuthService
   * @param SessionService
   *
   * @returns {Function}
   *
   * @constructor
   */
  function GetImage($http, $q, BASE, CropImage, AuthService, SessionService) {
    return function (id) {
      var deferred = $q.defer();

      $http.get(BASE.url + '/image/' + id, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          var photo = null;

          if (res.images) {
            photo = CropImage('x1000', res.images, 'thumbnail_url');
          }

          deferred.resolve(photo);

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
