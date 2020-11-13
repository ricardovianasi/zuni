(function () {
  'use strict';

  angular.module('ZN.albums')
    .controller('AlbumEditController', AlbumEditController);

  AlbumEditController.$inject = [
    '$q',
    'AlbumInfo',
    '$scope',
    'LocationHints',
    'AuthorHints',
    'GetTags',
    'GetUsers',
    'GetGroups'
  ];

  /**
   * @param $q
   * @param AlbumInfo
   * @param $scope
   * @param LocationHints
   * @param AuthorHints
   * @param GetTags
   * @param GetUsers
   * @param GetGroups
   *
   * @constructor
   */
  function AlbumEditController($q, AlbumInfo, $scope, LocationHints, AuthorHints, GetTags, GetUsers, GetGroups) {
    console.log('... AlbumEditController');

    var vm = this;
    vm.detail = AlbumInfo;

    vm.LocationHints = LocationHints;
    vm.AuthorHints = AuthorHints;

    GetTags.tags().then(function (data) {
      $scope.TagsHints = data;
    });

    $scope.UsersGroupsHints = [];

    $q.all({
      groups: GetGroups(),
      users: GetUsers()
    }).then(function (data) {
      $scope.UsersGroupsHints = data.users;
      $scope.UsersGroupsHints.concat(data.groups);
    });

    /**
     * @param name
     *
     * @returns {{tag: Array, name: Array}}
     */
    $scope.tagTransform = function (name) {
      var clean_name = name.split('');

      if (clean_name[clean_name.length - 1] == ',') {
        clean_name.splice(-1, 1);
        clean_name = clean_name.join('');
      } else {
        clean_name = name;
      }

      return {
        tag: clean_name,
        name: clean_name
      };
    }
  }
}());
