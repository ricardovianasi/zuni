(function () {
  'use strict';

  angular.module('ZN.albums')
<<<<<<< HEAD
    .directive('znThumb', znThumbs);
=======
  .directive('znThumb', znThumbs);
>>>>>>> develop

  znThumbs.$inject = ['$window', '$timeout'];

  /**
<<<<<<< HEAD
   * @param $window
   * @param $timeout
   *
   * @returns {{restrict: string, templateUrl: string, link: link}}
   */
=======
  * @param $window
  * @param $timeout
  *
  * @returns {{restrict: string, templateUrl: string, link: link}}
  */
>>>>>>> develop
  function znThumbs($window, $timeout) {
    return {
      restrict: 'EA',
      templateUrl: 'app/Application/Albums/views/directives/znThumb.html',
      link: link
    };

    /**
<<<<<<< HEAD
     * @param scope
     * @param element
     */
    function link(scope, element) {
      /**
       *
       */
=======
    * @param scope
    * @param element
    */
    function link(scope, element) {
      /**
      *
      */
>>>>>>> develop
      scope.ignoreDate = function () {
        scope.noDate = (scope.noDate) ? false : true;
      };

      /**
<<<<<<< HEAD
       * @param name
       *
       * @returns {{tag: Array, name: Array}}
       */
=======
      * @param name
      *
      * @returns {{tag: Array, name: Array}}
      */
>>>>>>> develop
      scope.tagTransform = function (name) {
        var clean_name = name.split('');
        if (clean_name[clean_name.length - 1] == ',') {
          clean_name.splice(-1, 1);
          clean_name = clean_name.join('');
        } else {
          clean_name = name;
        }

        return {
          tag: clean_name,
          name: clean_name
        };
      };

      var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        /**
<<<<<<< HEAD
         * @param item
         *
         * @returns {boolean}
         */
=======
        * @param item
        *
        * @returns {boolean}
        */
>>>>>>> develop
        isFile: function (item) {
          return angular.isObject(item) && item instanceof $window.File;
        },
        /**
<<<<<<< HEAD
         * @param file
         *
         * @returns {boolean}
         */
=======
        * @param file
        *
        * @returns {boolean}
        */
>>>>>>> develop
        isImage: function (file) {
          var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';

          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      };

      if (!helper.support) {
        return;
      }

      //Set the current date
      scope.currentDate = new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
      $timeout(function () {
        scope.fileItem.formatted_date = scope.currentDate;
        scope.$apply();
      });

      var params = scope.fileItem.file;

      if (!helper.isFile(params._file)) {
        return;
      }

      if (!helper.isImage(params._file)) {
        return;
      }

      var canvas = element.find('canvas');
      var reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params._file);

      /**
<<<<<<< HEAD
       * @param event
       */
=======
      * @param event
      */
>>>>>>> develop
      function onLoadFile(event) {
        var img = new Image();

        img.onload = onLoadImage;
        img.src = event.target.result;
      }

      /**
<<<<<<< HEAD
       *
       */
=======
      *
      */
>>>>>>> develop
      function onLoadImage() {
        var width = this.width;
        var height = this.height;

        canvas.attr({
<<<<<<< HEAD
          width: 450,
          height: 450
        });

        var sx = (width - 450) / 2;
        var sy = (height - 450) / 2;
        var sWidth = 450;
        var sHeight = 450;
=======
          width: 1900,
          height: 1900
        });

        var sx = (width - 1900) / 2;
        var sy = (height - 1900) / 2;
        var sWidth = 1900;
        var sHeight = 1900;
>>>>>>> develop
        var dx = sx;
        var dy = sy;
        var dWidth = sWidth;
        var dHeight = sHeight;

        canvas[0].getContext('2d').drawImage(this, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
<<<<<<< HEAD
=======

>>>>>>> develop
      }
      //LOCATION FIELD
    }
  }
}());
