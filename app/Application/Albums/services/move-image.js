(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('MoveImage', MoveImage);

  MoveImage.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

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
  function MoveImage($http, $q, BASE, Serialize, SessionService) {
    return function (requestObject) {
      var deferred = $q.defer(),
        requestData;

      requestData = Serialize(requestObject);

      $http.post(BASE.url + '/image/move', requestData, {
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
