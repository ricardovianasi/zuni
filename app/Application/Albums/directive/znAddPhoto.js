(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znAddPhoto', znAddPhoto);

  znAddPhoto.$inject = ['$rootScope', 'UploadHelper'];

  /**
   * @param $rootScope
   * @param UploadHelper
   *
   * @returns {{restrict: string, link: link}}
   */
  function znAddPhoto($rootScope, UploadHelper) {
    return {
      restrict: 'EA',
      link: link
    };

    /**
     * @param scope
     * @param element
     */
    function link(scope, element) {
      var buttonDefaultName = 'Selecione um album';

      scope.addPhotoModal = function () {
        scope.readyUpload = false;
        scope.openModal = true;
      };

      /**
       * Create a new album
       *
       * @param hasAlbum
       *
       * @returns {boolean}
       */
      scope.selectPhotos = function (hasAlbum) {
        var inputElement = element[0].querySelector('input[type="file"]');

        if (!hasAlbum) {
          UploadHelper.clearUpload();
        }

        //Open the input box
        inputElement.click();

        return false;
      };

      //Open album list
      scope.openSelectAlbum = function (e) {
        var actionButton = element[0].querySelector('.js-select-album');

        actionButton.innerText = buttonDefaultName;

        scope.getAlbumList = (scope.getAlbumList) ? false : true;
      };

      /**
       * Select an existing album
       *
       * @param album
       *
       * @returns {boolean}
       */
      scope.getThisAlbum = function (album) {
        var actionButton = element[0].querySelector('.js-select-album');

        actionButton.innerText = album.name;
        scope.getAlbumList = false;

        //Define the albumID
        $rootScope.albumSelected = album;

        //Open the input box
        scope.selectPhotos(true);

        return false;
      };

      /**
       * @returns {boolean}
       */
      scope.cancelUpload = function () {
        var actionButton = element[0].querySelector('.js-select-album');

        scope.openModal = false;

        //Set the default name
        actionButton.innerText = buttonDefaultName;

        UploadHelper.clearUpload();

        return false;
      }
    }
  }
}());
