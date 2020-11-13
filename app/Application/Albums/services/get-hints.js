(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('GetHints', GetHints);

  GetHints.$inject = ['$http', '$q', 'BASE', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param SessionService
   *
   * @returns {{location: location, author: author}}
   *
   * @constructor
   */
  function GetHints($http, $q, BASE, SessionService) {
    var location_deferred = $q.defer(),
      author_deferred = $q.defer();

    $http.get(BASE.url + '/location', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': SessionService.get().token
      },
      withCredentials: true
    }).success(function (res) {
      location_deferred.resolve(res.locations);
    }).error(function (error) {
      location_deferred.reject(error);
    });

    $http.get(BASE.url + '/author', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': SessionService.get().token
      },
      withCredentials: true
    }).success(function (res) {
      author_deferred.resolve(res.authors);
    }).error(function (error) {
      author_deferred.reject(error);
    });

    return {
      location: function () {
        return location_deferred.promise;
      },
      author: function () {
        return author_deferred.promise;
      }
    }
  }
}());
