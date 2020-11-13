(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znUpload', znUpload);

  znUpload.$inject = ['$rootScope', 'UploadHelper', '$timeout'];

  /**
   * @param $rootScope
   * @param UploadHelper
   * @param $timeout
   *
   * @returns {{restrict: string, link: link}}
   */
  function znUpload($rootScope, UploadHelper, $timeout) {
    return {
      restrict: 'A',
      link: link
    };

    /**
     * @param scope
     */
    function link(scope) {
      //Create a uploadInstance
      UploadHelper.createUpload();

      // FILTERS
      $rootScope.uploader.filters.push({
        name: 'imageFilter',
        /**
         * @param item
         * @param options
         *
         * @returns {boolean}
         */
        fn: function (item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';

          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      var itens;

      /**
       * @param fileItem
       */
      $rootScope.uploader.onAfterAddingFile = function (fileItem) {
        if (fileItem) {
          itens = [];
          scope.readyUpload = true;
        }
      };

      /**
       *
       */
      $rootScope.uploader.onAfterAddingAll = function () {
        scope.progress = 0;
      };

      /**
       * @param progress
       */
      $rootScope.uploader.onProgressAll = function (progress) {
        scope.progress = progress;
      };

      /**
       * @param fileItem
       * @param response
       */
      $rootScope.uploader.onSuccessItem = function (fileItem, response) {
        if (response.gallery.error) {
          console.log('Error:', response.gallery.message);
        } else {
          itens.push({
            name: response.gallery.src.filename,
            file: fileItem
          });
        }
      };

      /**
       *
       */
      $rootScope.uploader.onCompleteAll = function () {
        var album = $rootScope.albumSelected;

        //Clean album selected
        $rootScope.albumSelected = null;
        //hide ready
        scope.openModal = false;
        //Set the uploadList
        $rootScope.uploadItens = itens;

        $timeout(function () {
          //Hide upload process
          scope.readyUpload = false;

          if (album) {
            $rootScope.hasAlbum = album;
          } else {
            $rootScope.hasAlbum = {};
          }

          $rootScope.openCreate = true;
        }, 200);
      };
    }
  }
}());
