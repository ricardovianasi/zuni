(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znCopy', znCopy);

<<<<<<< HEAD
  znCopy.$inject = ['$window', 'GetAlbums', 'CopyImage', '$location'];
=======
  znCopy.$inject = ['$window', 'GetAlbums', 'CopyImageService', '$location'];
>>>>>>> develop

  /**
   * @param $window
   * @param GetAlbums
<<<<<<< HEAD
   * @param CopyImage
=======
   * @param CopyImageService
>>>>>>> develop
   * @param $location
   *
   * @returns {{restrict: string, link: link}}
   */
<<<<<<< HEAD
  function znCopy($window, GetAlbums, CopyImage, $location) {
=======
  function znCopy($window, GetAlbums, CopyImageService, $location) {
>>>>>>> develop
    return {
      restrict: 'AE',
      link: link
    };

    /**
     * @param $scope
     */
    function link($scope) {
      //Set the default name of button
      $scope.name = 'Selecionar album';
      $scope.idAlbum = null;

      /*
       * OPEN SELECT
       */
      $scope.openSelect = function () {
        //If doesn't exist AlbumsList in Local Storage
        if (!$window.sessionStorage.getItem('moveToAlbumLIst')) {
          //Retrieve the albums list
          GetAlbums().then(function (albums) {
            $window.sessionStorage.setItem('moveToAlbumLIst', JSON.stringify(albums));

            $scope.albumsToMove = albums;
            $scope.open = ($scope.open) ? false : true;
          });

          //If exist
        } else {
          $scope.albumsToMove = JSON.parse($window.sessionStorage.getItem('moveToAlbumLIst'));
          $scope.open = ($scope.open) ? false : true;
        }
      };

      /**
       * GET THE NAME OF ALBUM
       *
       * @param id
       * @param name
       */
      $scope.getName = function (id, name) {
        $scope.name = name;
        $scope.idAlbum = id;

        //Hide the select list
        $scope.open = false;
      };

      /**
       * CONFIRM MOVE ACTION
       *
       * @param idImage
       * @param albumID
       */
      $scope.copy = function (idImage, albumID) {
        if ($scope.idAlbum) {
<<<<<<< HEAD
          CopyImage($scope.idAlbum, idImage).then(function (res) {
=======
          CopyImageService($scope.idAlbum, idImage).then(function (res) {
>>>>>>> develop
            if (res.copied) {
              $scope.idAlbum = null;
              $scope.name = 'Selecionar album';

              //Set the default values anc close modal
              $scope.cancel();

              $location.path('/albums/' + albumID);
            }
          });
        }
      };

      /*
       * CANCEL MODAL
       */
      $scope.cancel = function () {
        var modal = angular.element(document.querySelectorAll('.zuni-dialog'));

        modal.removeClass('zuni-dialog--open');

        //Set the default name of button
        $scope.name = 'Selecionar album';

        //Clear the albumId
        $scope.idAlbum = null;
      }
    }
  }
})();
