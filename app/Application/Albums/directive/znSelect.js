(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znSelect', znSelect);

  znSelect.$inject = ['$location', 'EditHelper'];

  /**
   * @param $location
   * @param EditHelper
   *
   * @returns {{restrict: string, link: link}}
   */
  function znSelect($location, EditHelper) {
    return {
      restrict: 'AC',
      link: link
    };

    /**
     * @param $scope
     * @param $element
     */
    function link($scope, $element) {
      //Set to default
      $scope.selected = false;

      /**
       *
       */
      $scope.selectItens = function () {
        $scope.onSelect = true;
      };

      /**
       *
       */
      $scope.cancelSelect = function () {
        $scope.onSelect = false;
        $scope.allSelected = false;
        $scope.selected = false;
      };

      /**
       * Function that select this Album
       *
       * @param field
       */
      $scope.selectThisIten = function (field) {
        var item = field.target.querySelector('input');
        var itemList = $element[0].querySelectorAll('.js-album-item');
        var i = 0;

        item.checked = (item.checked) ? false : true;

        for (i; i < itemList.length; i++) {
          var itemCheck = itemList[i].querySelector('.js-check');

          if (itemCheck.checked) {
            $scope.selected = true;
            break;
          } else {
            $scope.selected = false;
          }

          //$scope.selected = (itemCheck.checked) ? true : false;
        }
      };

      /**
       * Function that select All Albums
       */
      $scope.selectAllItens = function () {
        $scope.allSelected = true;
        $scope.selected = true;
      };

      /**
       * Edit album
       *
       * @param id
       */
      $scope.editThisAlbum = function (id) {
        if (id) {
          EditHelper.saveAlbumInfo($scope.vm.detail, function () {
            $location.path('/albums/edit/' + id);
          });
        }
      };
    }
  }
})();
