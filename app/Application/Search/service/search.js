(function () {
  'use strict';

  angular.module('ZN.search')
    .factory('Search', Search);

  Search.$inject = ['$http', '$q', 'BASE', 'CropImage', 'AuthService', 'SessionService'];

  /**
   * @param $http
   * @param $q
   * @param BASE
   * @param CropImage
   * @param AuthService
   * @param SessionService
   *
   * @returns {Function}
   *
   * @constructor
   */
  function Search($http, $q, BASE, CropImage, AuthService, SessionService) {
    /**
     * @param searchText
     * @param albumID
     *
     * @returns {deferred.promise|{then, catch, finally}}
     */
    function search(searchText, albumID) {
      var deferred = $q.defer();

      $http.get(BASE.url + '/image', {
          params: {
            query: searchText,
            idAlbum: albumID
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SessionService.get().token
          },
          withCredentials: true
        })
        .success(function (res) {
          var photos,
            size = [],
            location = [],
            owner = [],
            year = [],
            i = 0;

          photos = CropImage('350x350', res.images, 'thumbnail_url');

          for (i; i < photos.length; i++) {
            if (size.indexOf(photos[i].size) === -1 && photos[i].size) {
              size.push(photos[i].size);
            }

            if (photos[i].location) {
              if (location.indexOf(photos[i].location.name) === -1 && photos[i].location.name) {
                location.push(photos[i].location.name);
              }
            }

            if (photos[i].owner) {
              if (owner.indexOf(photos[i].owner.name) === -1 && photos[i].owner.name) {
                owner.push(photos[i].owner.name);
              }
            }

            if (photos[i].formatted_date && year.indexOf(photos[i].formatted_date.split('/')[2]) === -1) {
              year.push(photos[i].formatted_date.split('/')[2]);
            }
          }

          var searchResult = {
            photos: photos,
            size: size,
            location: location,
            owner: owner,
            year: year
          };

          deferred.resolve(searchResult);

          if (res.user) {
            AuthService.setUser(res.user);
          }
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    return search;
  }
}());
