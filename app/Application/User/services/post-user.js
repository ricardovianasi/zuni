(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('PostUser', PostUser);

  PostUser.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

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
  function PostUser($http, $q, BASE, Serialize, SessionService) {
    return function (user) {
      var deferred = $q.defer();

      var newUser = Serialize(user);

      $http.post(BASE.url + '/user', newUser, {
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
