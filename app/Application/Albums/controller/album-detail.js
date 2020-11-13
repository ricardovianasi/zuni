(function () {
  'use strict';

  angular.module('ZN.albums')
    .controller('AlbumDetailsController', AlbumDetailsController);

  AlbumDetailsController.$inject = ['$scope', 'Album', 'LocationHints', 'AuthorHints', 'GetTags'];

  /**
   * @param $scope
   * @param Album
   * @param LocationHints
   * @param AuthorHints
   * @param GetTags
   *
   * @constructor
   */
  function AlbumDetailsController($scope, Album, LocationHints, AuthorHints, GetTags) {
    console.log('... AlbumDetailsController');

    //View model namespace
    var vm = this;
    vm.detail = Album;

    $scope.TagsHints = [{}];
    $scope.LocationHints = LocationHints;
    $scope.AuthorHints = AuthorHints;

    GetTags.tags().then(function (data) {
      $scope.TagsHints = data;
    });
<<<<<<< HEAD
  }
=======

  }

>>>>>>> develop
}());
