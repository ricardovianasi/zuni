(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('UpdateAlbum', UpdateAlbum);

  UpdateAlbum.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param Serialize
   * @param SessionService
   *
   * @returns {{edit: edit, upload: upload}}
   *
   * @constructor
   */
  function UpdateAlbum($http, $q, BASE, Serialize, SessionService) {
    return {
      edit: function (updateData) {
        var deferred = $q.defer();

        var serializeObject = Serialize(updateData.album);

        $http.put(BASE.url + '/album/' + updateData.id, serializeObject, {
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
      upload: function (uploadData) {
        var deferred = $q.defer(),
          fd = new FormData(),
          i = 0;

        var serializeObject = Serialize(uploadData);

        $http.put(BASE.url + '/album/' + uploadData.album.id, serializeObject, {
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
