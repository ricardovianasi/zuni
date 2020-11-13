(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('GetTags', GetTags);

  GetTags.$inject = ['$http', '$q', 'BASE', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param SessionService
   *
   * @returns {{tags: tags, share: share}}
   *
   * @constructor
   */
  function GetTags($http, $q, BASE, SessionService) {
    return {
      tags: function () {
        var deferred = $q.defer();

        $http.get(BASE.url + '/tag', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': SessionService.get().token
            },
            withCredentials: true
          })
          .success(function (res) {
            deferred.resolve(res.tags);
          })
          .error(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      },
      share: function () {
        var deferred = $q.defer();

        $http.get(BASE.url + '/share', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': SessionService.get().token
            },
            withCredentials: true
          })
          .success(function (res) {
            var share = angular.extend(res.groups, res.users);
            deferred.resolve(share);
          })
          .error(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      }
    }
  }
}());
