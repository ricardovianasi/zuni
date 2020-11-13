(function () {
  'use strict';

  angular
    .module('ZN.albums')
    .factory('DownloadService', Download);

  Download.$inject = ['$http', '$q', 'BASE', 'SessionService'];

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
  function Download($http, $q, BASE, SessionService) {
    return function (imagesArray, option) {
      var deferred = $q.defer();

      //Imagens
      var params = {imagesId: imagesArray};

      //Todas as imagens
      if (option.allSelected)
        params = {albumId: option.album}

      $http.get(BASE.url + '/image/download', {
          params: params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (items) {
          deferred.resolve(items);
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
}());
