(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('CreateAlbum', CreateAlbum);

  CreateAlbum.$inject = ['$http', '$q', 'BASE', 'SessionService'];

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
  function CreateAlbum($http, $q, BASE, SessionService) {
    return function (uploadData) {
      var deferred = $q.defer(),
        fd = new FormData(),
        i = 0;

      /**
       * Append the images to formData request
       */
      for (i; i < uploadData.images.length; i++) {
        for (var prop in uploadData.images[i]) {
          fd.append('images[' + i + '][' + prop + ']', uploadData.images[i][prop]);
        }
      }

      /**
       * Append the album to formData request
       */
      for (var prop in uploadData.album) {

        if (uploadData.album[prop] instanceof Object) {
          var propType = 0;

          for (propType in uploadData.album[prop]) {
            fd.append('album[' + prop + '][' + propType + ']', uploadData.album[prop][propType]);
          }
        } else {
          fd.append('album[' + prop + ']', uploadData.album[prop]);
        }
      }

      $http.post(BASE.url + '/album', fd, {
          headers: {
            'Content-Type': undefined,
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
