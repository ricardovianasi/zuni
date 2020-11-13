(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('UploadHelper', UploadHelper);

  UploadHelper.$inject = ['$rootScope', 'SessionService', 'FileUploader', 'BASE'];

  /**
   * @param $rootScope
   * @param SessionService
   * @param FileUploader
   * @param BASE
   *
   * @returns {{createUpload: createUpload, clearUpload: clearUpload}}
   *
   * @constructor
   */
  function UploadHelper($rootScope, SessionService, FileUploader, BASE) {
    return {
      createUpload: function () {
        //DEFINE THE UPLOAD INSTANCE

        if (!$rootScope.uploader) {
          $rootScope.uploader = new FileUploader({
            url: BASE.url + '/upload',
            headers: {
              'Authorization': SessionService.get().token
            },
            autoUpload: true
          });
        }
        return false;
      },
      clearUpload: function () {
        //Clean selected album
        $rootScope.albumSelected = null;

        //Clear upload
        $rootScope.uploader.cancelAll();
        $rootScope.uploadItens = [];
      }
    }
  }
}());
