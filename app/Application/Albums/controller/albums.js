(function () {
  'use strict';

  angular.module('ZN.albums')
    .controller('AlbumsController', AlbumsController);

  AlbumsController.$inject = ['Albums', '$scope', 'LocationHints', 'AuthorHints', 'GetTags'];

  /**
   * @param Albums
   * @param $scope
   * @param LocationHints
   * @param AuthorHints
   * @param GetTags
   *
   * @constructor
   */
  function AlbumsController(Albums, $scope, LocationHints, AuthorHints, GetTags) {
    console.log('... AlbumsController');

    //View model namespace
    var vm = this;
    vm.albums = Albums;

    $scope.LocationHints = LocationHints;
    $scope.AuthorHints = AuthorHints;
    GetTags.tags().then(function (data) {
      $scope.TagsHints = data;
    });
  }
}());
