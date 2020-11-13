(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znDeleteAlbum', znDeleteAlbum);

  znDeleteAlbum.$inject = ['DeleteAlbum', '$location'];

  /**
   * @param DeleteAlbum
   * @param $location
   *
   * @returns {{restrict: string, link: link}}
   */
  function znDeleteAlbum(DeleteAlbum, $location) {
    return {
      restrict: 'AE',
      link: link
    };

    /**
     * @param $scope
     */
    function link($scope) {
      /**
       * CONFIRM THE DELETE ACTION
       *
       * @param albumID
       */
      $scope.confirmDelete = function (albumID) {
        DeleteAlbum(albumID).then(function (res) {
          if (res.deleted) {
            $scope.cancelDelete(true);
          }
        });
      };

      /**
       * CANCEL MODAL
       *
       * @param redirect
       */
      $scope.cancelDelete = function (redirect) {
        var modal = angular.element(document.querySelectorAll('.js-delete-album'));

        modal.removeClass('zuni-dialog--open');

        if (redirect) {
          $location.path('/albums');
        }
      }
    }
  }
})();
