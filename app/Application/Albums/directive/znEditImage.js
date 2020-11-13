(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znEditImage', znEditImage);

  znEditImage.$inject = ['PutImage', '$window', '$route'];

  /**
   * @param PutImage
   * @param $window
   * @param $route
   *
   * @returns {{restrict: string, link: link}}
   */
  function znEditImage(PutImage, $window, $route) {
    return {
      restrict: 'AE',
      link: link
    };

    /**
     * @param $scope
     * @param $element
     */
    function link($scope, $element) {
      /*
       * CONFIRM EDIT
       */
      $scope.confirmEdit = function (albumID, image) {
        var input = angular.element($element[0].querySelector('.js-tags-values'));
        var requestObject;
        var concatImageTags = '';

        if (image.tags || image.tags.length >= 1) {
          angular.forEach(image.tags, function (tag) {
            concatImageTags = concatImageTags + tag.tag + ',';
          });
          concatImageTags = concatImageTags.substring(0, concatImageTags.length - 1);
        }

        requestObject = {
          images: [{
            id: image.id,
            date: image.noDate ? '0000' : image.formatted_date,
            owner: image.owner
              ? image.owner.originalObject
                ? (image.owner.originalObject.name || image.owner.originalObject)
                : (image.owner.name || '')
              : '',
            location: image.location
              ? image.location.originalObject
                ? (image.location.originalObject.name || image.location.originalObject)
                : (image.location.name || '')
              : '',
            description: image.description,
            tags: image.tags ? concatImageTags : ''
          }]
        };

        PutImage(requestObject, albumID).then(function (res) {
          if (res.images)
            $scope.cancel();
          $route.reload();
        });
      };

      /*
       * CANCEL MODAL
       */
      $scope.cancel = function (image, refresh) {
        var modal = angular.element(document.querySelectorAll('.zuni-dialog'));

        if (!refresh) {
          modal.removeClass('zuni-dialog--open');

          if ($scope.$parent.openEdit)
            $scope.$parent.openEdit();
        } else {
          $window.location.href = $window.location.href;
        }
      }
    }
  }
})();
