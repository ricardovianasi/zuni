(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znDelete', znDelete);

  znDelete.$inject = ['DeleteImage', '$location'];

  /**
   * @param DeleteImage
   * @param $location
   *
   * @returns {{restrict: string, link: link}}
   */
  function znDelete(DeleteImage, $location) {
    return {
      restrict: 'AE',
      link: link
    };

    /**
     * @param $scope
     * @param $element
     */
    function link($scope) {
      /**
       * OPEN DELETE DIALOG
       */
      $scope.openDeleteDialog = function () {
        var dialog = document.querySelector('.js-delete-all-dialog');

        angular.element(dialog).addClass('zuni-dialog--open');
      };

      /**
       * CONFIRM THE DELETE ACTION
       *
       * @param args
       *
       * @returns {boolean}
       */
      $scope.confirmDelete = function (args) {
        var checkbox = document.querySelectorAll('.js-check');
        var requestObject;

        if (!typeof args === 'object') {
          console.log('[Error - DELETE] Args must be an object');

          return false;
        }

        if (!args.type) {
          console.log('[Error - DELETE] Delete must have an parameter type');

          return false;
        }

        /**
         * If type of action is for delete a lot of images
         */
        if (args.type === 'multiple') {
          var imagesArray = [];
          var iImage = 0;

          for (iImage; iImage < checkbox.length; iImage++) {
            if (checkbox[iImage].checked === true) {
              imagesArray.push(parseInt(checkbox[iImage].getAttribute('id')));
            }
          }

          /**
           * Request object contains the data of images
           */
          requestObject = {
            images: imagesArray,
          };

          /**
           * Send the data
           * @param  {[requestObject]})
           */
          DeleteImage.multiple(requestObject).then(function (res) {
            var i = 0;

            if (res.deleted) {
              if (args.list) {
                for (i; i < args.list.length; i++) {
                  if (imagesArray.indexOf(args.list[i].id) !== -1) {
                    args.list.splice(i, 1);
                    i = -1;
                  }
                }

                //Close action
                $scope.cancel();
              } else {
                $location.path('/albums/' + args.albumID);
              }
            }
          });

          return false;
        }

        if (args.type === 'single') {
          DeleteImage.single(args.imageID).then(function (res) {
            if (res.deleted) {
              if (args.list) {
                args.list.splice(args.index, 1);

                //Close action
                $scope.cancel();
              } else {
                $location.path('/albums/' + args.albumID);
              }
            }
          });
        }

        return false;
      };

      /*
       * CANCEL MODAL
       */
      $scope.cancel = function () {
        var modal = angular.element(document.querySelectorAll('.zuni-dialog'));

        modal.removeClass('zuni-dialog--open');

        if ($scope.$parent.cancelSelect) {
          $scope.$parent.cancelSelect();
        }
      }
    }
  }
})();
