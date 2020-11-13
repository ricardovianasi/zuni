(function () {
  'use strict';

  angular.module('ZN.albums')
<<<<<<< HEAD
    .directive('znMove', znMove);
=======
  .directive('znMove', znMove);
>>>>>>> develop

  znMove.$inject = ['$window', 'GetAlbums', 'MoveImage', '$location'];

  /**
<<<<<<< HEAD
   * @param $window
   * @param GetAlbums
   * @param MoveImage
   * @param $location
   *
   * @returns {{restrict: string, link: link}}
   */
=======
  * @param $window
  * @param GetAlbums
  * @param MoveImage
  * @param $location
  *
  * @returns {{restrict: string, link: link}}
  */
>>>>>>> develop
  function znMove($window, GetAlbums, MoveImage, $location) {
    return {
      restrict: 'AE',
      link: link
    };

    /**
<<<<<<< HEAD
     * @param $scope
     */
=======
    * @param $scope
    */
>>>>>>> develop
    function link($scope) {
      var albumSelected = null;

      //Set the default name of button
      $scope.name = 'Selecionar album';

      /*
<<<<<<< HEAD
       * OPEN MOVE DIALOG
       */
=======
      * OPEN MOVE DIALOG
      */
>>>>>>> develop
      $scope.openMoveDialog = function () {
        var dialog = document.querySelector('.js-move-all-dialog');
        angular.element(dialog).addClass('zuni-dialog--open');
      };

      /*
<<<<<<< HEAD
       * OPEN SELECT
       */
=======
      * OPEN SELECT
      */
>>>>>>> develop
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

      /*
<<<<<<< HEAD
       * GET THE NAME OF ALBUM
       */
=======
      * GET THE NAME OF ALBUM
      */
>>>>>>> develop
      $scope.getName = function (id, name) {
        $scope.name = name;
        albumSelected = id;

        //Hide the select list
        $scope.open = false;
      };

      /**
<<<<<<< HEAD
       * CONFIRM MOVE
       *
       * @param args
       *
       * @returns {boolean}
       */
      $scope.confirmMove = function (args) {
        var checkbox = document.querySelectorAll('.js-check'),
          requestObject;
=======
      * CONFIRM MOVE
      *
      * @param args
      *
      * @returns {boolean}
      */
      $scope.confirmMove = function (args) {
        var checkbox = document.querySelectorAll('.js-check'),
        requestObject;
>>>>>>> develop


        if (!typeof args === 'object') {
          console.log('[Error - MOVE] Args must be an object');

          return false;
        }

        /**
<<<<<<< HEAD
         * Verify if the user has selected an album id
         */
=======
        * Verify if the user has selected an album id
        */

>>>>>>> develop
        if (albumSelected) {
          var imagesArray = [];

          /**
<<<<<<< HEAD
           * If this is actions is for multiple images
           * Get the id of all images selected
           */
=======
          * If this is actions is for multiple images
          * Get the id of all images selected
          */
>>>>>>> develop
          if (args.type === 'all') {
            var iImage = 0;

            for (iImage; iImage < checkbox.length; iImage++) {
              if (checkbox[iImage].checked === true) {
                imagesArray.push(parseInt(checkbox[iImage].getAttribute('id')));
              }
            }

            /**
<<<<<<< HEAD
             * Request object contains the data of images and album
             */
=======
            * Request object contains the data of images and album
            */
>>>>>>> develop
            requestObject = {
              images: imagesArray,
              idAlbum: albumSelected
            }
          }

          /**
<<<<<<< HEAD
           * If this is actions is for a single image
           */
          if (args.type === 'single') {
            /**
             * Request object contains the data of images and album
             */
=======
          * If this is actions is for a single image
          */
          if (args.type === 'single') {
            /**
            * Request object contains the data of images and album
            */
>>>>>>> develop
            requestObject = {
              idImage: args.imageID,
              idAlbum: albumSelected
            }
          }

          /**
<<<<<<< HEAD
           * Send the data
           * @param  {[requestObject]})
           */
=======
          * Send the data
          * @param  {[requestObject]})
          */
>>>>>>> develop
          MoveImage(requestObject).then(function (res) {
            var i = 0;

            /**
<<<<<<< HEAD
             * IF SUCCESS
             */
            if (res.moved) {
=======
            * IF SUCCESS
            */
            if (res.moved && typeof imagesArray !== 'undefined' && imagesArray.length > 0) {

>>>>>>> develop
              if (args.list) {
                for (i; i < args.list.length; i++) {
                  if (imagesArray.indexOf(args.list[i].id) !== -1) {
                    args.list.splice(i, 1);
                    i = -1;
                  }
                }
              }

              //Set the default values anc close modal
              $scope.cancel();

              /**
<<<<<<< HEAD
               * IF HAS AN ALBUM ID
               * redirect the user
               */
              if (args.albumID)
                $location.path('/albums/' + args.albumID);
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
        albumSelected = null;

        if ($scope.$parent.cancelSelect)
          $scope.$parent.cancelSelect();
      }
    }
  }
=======
              * IF HAS AN ALBUM ID
              * redirect the user
              */
              if (args.albumID) {
                $location.path('/albums/' + args.albumID);
              }

            } else if (res.moved && args.imageID) {
              if (args.list) {
                args.list.splice(args.index, 1);

                //Close action
                $scope.cancel();

                if (args.albumID) {
                  $location.path('/albums/' + args.albumID);
                }
              }
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
      albumSelected = null;

      if ($scope.$parent.cancelSelect)
      $scope.$parent.cancelSelect();
    }
  }
}
>>>>>>> develop
})();
