(function () {
  'use strict';

  angular.module('ZN.user')
    .factory('ChangePassword', ChangePassword);

  ChangePassword.$inject = ['$http', '$q', 'BASE', 'Serialize', 'SessionService'];

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
  function ChangePassword($http, $q, BASE, Serialize, SessionService) {
    return function (passwords) {
      var deferred = $q.defer();

      var newPassword = Serialize(passwords);

      $http.post(BASE.url + '/user/update-password', newPassword, {
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
