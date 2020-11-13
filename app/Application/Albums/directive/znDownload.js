(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znDownload', znDownload);

  znDownload.$inject = ['DownloadService', '$window'];

  /**
   * @param DownloadService
   * @param $window
   *
   * @returns {{restrict: string, link: link}}
   */
  function znDownload(DownloadService, $window) {
    return {
      restrict: 'EA',
      link: link
    };

    /**
     * @param $scope
     */
    function link($scope) {
      $scope.download = function (albumID) {
        var images = document.querySelectorAll('.album');
        var checkbox = document.querySelectorAll('.js-check');
        var imagesArray = [];
        var i = 0;

        for (i; i < checkbox.length; i++) {
          if (checkbox[i].checked === true) {
            imagesArray.push(checkbox[i].getAttribute('id'));
          }
        }

        var isAll = {
          allSelected: (images.length - 1) === imagesArray.length || false,
          album: albumID
        };

        DownloadService(imagesArray, isAll).then(function (item) {
          if (item.downloadFile) {
            $window.location = item.downloadFile;
            $scope.cancelSelect();
          }
        });
      }
    }
  }
}());
