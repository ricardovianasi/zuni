(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('PostGroup', PostGroup);

  PostGroup.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

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
  function PostGroup($http, $q, BASE, Serialize, SessionService) {
    return function (group) {
      var deferred = $q.defer();

      var newGroup = Serialize(group);

      $http.post(BASE.url + '/group', newGroup, {
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
