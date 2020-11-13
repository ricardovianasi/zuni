(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znActions', znActions);

  /**
   * @returns {{restrict: string, templateUrl: string, link: link}}
   */
  function znActions() {
    return {
      restrict: 'EA',
      templateUrl: 'app/Application/Albums/views/directives/znOptions.html',
      link: link
    };

    /**
     * @param $scope
     */
    function link($scope) {
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
      };

      $scope.showOptions = false;

      /**
       * OPEN EDIT OPTIONS
       */
      $scope.openEdit = function () {
        $scope.showOptions = !($scope.showOptions || $scope.showEditForm);
      };

      /*
       * DATA EDIT
       */

      /**
       * @param dialogID
       */
      $scope.edit = function (dialogID) {
        var dialog = document.querySelector('.js-edit-dialog-' + dialogID);

        angular.element(dialog).addClass('zuni-dialog--open');
      };

      /**
       * @param dialogID
       */
      $scope.delete = function (dialogID) {
        var dialog = document.querySelector('.js-delete-dialog-' + dialogID);

        angular.element(dialog).addClass('zuni-dialog--open');
      };

      /*
       * MOVE
       */
      $scope.move = function (dialogID) {
        var dialog = document.querySelector('.js-move-dialog-' + dialogID);

        angular.element(dialog).addClass('zuni-dialog--open');
      };

      /*
       * COPY
       */
      $scope.copy = function (dialogID) {
        var dialog = document.querySelector('.js-copy-dialog-' + dialogID);

        angular.element(dialog).addClass('zuni-dialog--open');
      };

      /*
       * `NO DATE
       */
      $scope.ignoreDate = function () {
        $scope.noDate = ($scope.noDate) ? false : true;
        $scope.photo.date = '';
      }
    }
  }
})();
