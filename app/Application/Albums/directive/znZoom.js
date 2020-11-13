(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znZoom', znZoom);

  znZoom.$inject = ['$window'];

  /**
   * @param $window
   *
   * @returns {{restrict: string, link: link}}
   */
  function znZoom($window) {
    return {
      restrict: 'A',
      link: link
    };

    /**
     * @param scope
     * @param element
     */
    function link(scope, element) {
      //Default
      scope.openZoom = false;

      /**
       *
       */
      scope.zoom = function () {
        if (scope.openZoom) {
          scope.openZoom = false;
        } else {
          var image = element.find('img');
          var container = angular.element(document.querySelector('.zoom-container'));
          var wWidth = $window.outerWidth;
          var wHeight = $window.outerHeight;
          var imgWidth;
          var imgHeight;
          var offset;

          //Open zoom container
          scope.openZoom = true;

          //Append image
          container.append(image);

          image = container.find('img');
          imgWidth = image[0].width;
          imgHeight = image[0].height;

          offset = (wHeight - imgHeight) / 2;

          /**
           * @param e
           *
           * @returns {boolean}
           */
          $window.onmousemove = function (e) {
            var x = e.pageX,
              y = e.pageY;

            if (!y === 0) {
              return false;
            }

            if ((y - imgHeight) < offset + 200) {
              container.find('img')[0].style.webkitTransform = 'translate(0, -' + y + 'px)';
            }
          };
        }
      }
    }
  }
}());
