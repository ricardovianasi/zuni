(function () {
  'use strict';

  angular.module('ZN.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'Search', '$route'];

  /**
   * @param $scope
   * @param Search
   * @param $route
   *
   * @constructor
   */
  function SearchController($scope, Search, $route) {
    console.log('... SearchController');

    $scope.searchFilter = {};
    $scope.searchFilter.location = null;
    $scope.searchFilter.owner = null;
    $scope.searchFilter.size = null;

    var param = $route.current.params.query;
    var albumID = $route.current.params.album;

    Search(param, albumID).then(function (result) {
      //Define the filters
      $scope.filter = {
        locations: result.location,
        sizes: result.size,
        owners: result.owner,
        years: result.year
      };

      angular.forEach(result.photos, function (photo) {
        var owner = photo.owner ? photo.owner.name : '';
        var location = photo.location ? photo.location.name : '';

        photo.owner = owner;
        photo.location = location;
        photo.year = photo.formatted_date.split('/')[2];
      });

      $scope.photos = result.photos;
    });

    //Set the title of search
    $scope.title = param;
  }
}());
