(function () {
  'use strict';

  angular
    .module('ZN.albums')
    .factory('DeleteImage', DeleteImage);

  DeleteImage.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param Serialize
   * @param SessionService
   *
   * @returns {{single: single, multiple: multiple}}
   *
   * @constructor
   */
  function DeleteImage($http, $q, BASE, Serialize, SessionService) {
    return {
      single: function (id) {
        var deferred = $q.defer();

        $http.delete(BASE.url + '/image/' + id, {
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
      },
      multiple: function (imagesObject) {
        var deferred = $q.defer();

        var images = Serialize(imagesObject);

        $http.delete(BASE.url + '/image', {
            data: images,
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
  }
}());
