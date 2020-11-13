(function () {
  'use strict';

  angular.module('ZN.albums')
    .controller('PhotoDetailController', PhotoDetailController);

  PhotoDetailController.$inject = ['$scope', 'Photo', '$location', 'LocationHints', 'AuthorHints', 'GetTags'];

  /**
   * @param $scope
   * @param Photo
   * @param $location
   * @param LocationHints
   * @param AuthorHints
   * @param GetTags
   *
   * @constructor
   */
  function PhotoDetailController($scope, Photo, $location, LocationHints, AuthorHints, GetTags) {
    console.log('... PhotoDetailController');

    if (Photo) {
      $scope.photo = Photo;
      $scope.albumID = Photo.id;
    }

    //Redirect user
    if (!Photo) {
      $location.path('/albums');
    }

    // HINTS
    var vm = this;

    $scope.$parent.LocationHints = LocationHints;
    $scope.$parent.AuthorHints = AuthorHints;
    GetTags.tags().then(function (data) {
      $scope.$parent.TagsHints = data;
    });
  }
}());
