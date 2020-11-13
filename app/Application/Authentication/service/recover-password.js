(function () {
  'use strict';

  angular.module('ZN.auth')
    .factory('RecoverPasswordService', RecoverPasswordService);

  RecoverPasswordService.$inject = ['$http', '$q', 'Serialize', 'BASE'];

  /**
   * @param $http
   * @param $q
   * @param Serialize
   * @param BASE
   *
   * @returns {Function}
   *
   * @constructor
   */
  function RecoverPasswordService($http, $q, Serialize, BASE) {
    var deferred = $q.defer();

    return function (credentials) {
      $http.post(BASE.url + '/user/forgetPassword', Serialize(credentials), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
        .success(function (password) {
          deferred.resolve(password);
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
}());
