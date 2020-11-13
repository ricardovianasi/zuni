(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znUploadPhoto', znUploadPhoto);

  znUploadPhoto.$inject = ['CreateAlbum', 'UpdateAlbum', '$rootScope', '$location', 'UploadHelper', '$window'];

  /**
   * @param CreateAlbum
   * @param UpdateAlbum
   * @param $rootScope
   * @param $location
   * @param UploadHelper
   * @param $window
   *
   * @returns {{restrict: string, link: link, scope: boolean}}
   */
  function znUploadPhoto(CreateAlbum, UpdateAlbum, $rootScope, $location, UploadHelper, $window) {
    return {
      restrict: 'EA',
      link: link,
      scope: true
    };

    /**
     * @param scope
     */
    function link(scope) {
      /**
       * Create a new album
       *
       * @param hasAlbum
       *
       * @returns {boolean}
       */
      scope.create = function (hasAlbum) {
        var uploadedItens = document.querySelectorAll('.thumb');
        var imagesData = [];
        var albumID = hasAlbum;
        var i = 0;

        /**
         * Valid if the user has filled the form
         */
        if (!validate()) {
          return false;
        }

        /**
         * Create a album object that contain all information about the album
         */
        var albumData = {};

        /**
         * Set the values
         */
        albumData.id = albumID || null;
        albumData.share = {
          users: [],
          groups: []
        };

        albumData.visibility = scope.content.visibility || scope.privacityOption;
        albumData.location = scope.content.location
          ? scope.content.location.originalObject
            ? scope.content.location.originalObject.name || scope.content.location.originalObject
            : scope.content.location.name || ''
          : '';
        albumData.name = scope.content.name || '';
        albumData.description = scope.content.description || '';

        //Set tags value
        setTags(hasAlbum);

        /**
         * @param hasAlbum
         */
        function setTags(hasAlbum) {
          var albumTags;
          var albumShare;
          var concatAlbumTags;

          if (hasAlbum) {
            albumTags = scope.content.tags;

            if (albumTags) {
              concatAlbumTags = '';

              angular.forEach(albumTags, function (tag) {
                concatAlbumTags = concatAlbumTags + tag.tag + ',';
              });

              concatAlbumTags = concatAlbumTags.substring(0, concatAlbumTags.length - 1);
              albumData.tags = concatAlbumTags;
            }
          } else {
            albumShare = scope.content.share;
            albumTags = scope.content.tags;

            if (albumTags) {
              concatAlbumTags = '';

              angular.forEach(albumTags, function (tag) {
                concatAlbumTags = concatAlbumTags + tag.tag + ',';
              });

              concatAlbumTags = concatAlbumTags.substring(0, concatAlbumTags.length - 1);
              albumData.tags = concatAlbumTags;
            }

            if (albumShare) {
              albumData.share.groups = [];
              albumData.share.users = [];
              angular.forEach(albumShare, function (userGroup) {
                if (userGroup.type == 'user') {
                  albumData.share.users.push(userGroup.id);
                }
                else {
                  albumData.share.groups.push(userGroup.id);
                }
              });
            }
          }
        }

        /**
         * Get the value of all images
         * Push the values to [imagesData] array
         */
        for (i; i < uploadedItens.length; i++) {
          var date;
          var location;
          var description;
          var owner;
          var imageIndex;

          date = uploadedItens[i].querySelector('.js-thumb-date').value;
          location = uploadedItens[i].querySelector('.js-thumb-location').value;
          owner = uploadedItens[i].querySelector('.js-thumb-author').value;
          description = uploadedItens[i].querySelector('.js-thumb-description').value;

          imageIndex = imagesData.push({
            filename: $rootScope.uploadItens[i].name,
            date: $rootScope.uploadItens[i].noDate ? '0' : $rootScope.uploadItens[i].formatted_date,
            location: $rootScope.uploadItens[i].location
              ? ($rootScope.uploadItens[i].location.originalObject
                ? $rootScope.uploadItens[i].location.originalObject.name || $rootScope.uploadItens[i].location.originalObject
                : $rootScope.uploadItens[i].location.name || '')
              : '',
            tags: [],
            owner: $rootScope.uploadItens[i].owner
              ? ($rootScope.uploadItens[i].owner.originalObject
                ? $rootScope.uploadItens[i].owner.originalObject.name || $rootScope.uploadItens[i].owner.originalObject
                : $rootScope.uploadItens[i].owner.name || '')
              : '',
            description: $rootScope.uploadItens[i].description || ''
          });

          // //Get the album tags values

          var imageTags = $rootScope.uploadItens[i].tags || [];

          if (imageTags) {
            var concatImageTags = '';

            angular.forEach(imageTags, function (tag) {
              concatImageTags = concatImageTags + tag.tag + ',';
            });

            concatImageTags = concatImageTags.substring(0, concatImageTags.length - 1);
            imagesData[imageIndex - 1].tags = concatImageTags;
          } else {
            imagesData[imageIndex - 1].tags = [];
          }
        }


        /**
         * Send the request
         * This function needs two parameters
         * [imagesData] - Array with info of all images
         * [albumData] - Object with info of album
         */
        var requestData = {
          images: imagesData,
          album: albumData
        };

        /**
         * If has an ID so we update the album
         * else, we create one
         */

        if (hasAlbum) {
          UpdateAlbum.upload(requestData).then(function (res) {
            if (res.album) {
              scope.cancel(res.album.id);
            }
          });

          return false;
        }

        CreateAlbum(requestData).then(function (res) {
          if (res.album) {
            scope.cancel(res.album.id);
          }
        });

        return false;
      };

      /**
       * Cancel UPLOAD
       *
       * @param albumID
       *
       * @returns {boolean}
       */
      scope.cancel = function (albumID) {
<<<<<<< HEAD
        if (scope.content) {
          scope.content.name = '';
          scope.content.location = '';
          scope.content.description = '';
          scope.content.tags = [];
        }
=======
>>>>>>> develop

        UploadHelper.clearUpload();

        if (albumID) {
          var path = $location.path();

          $rootScope.openCreate = false;

          if (path === '/albums') {
            $location.path('/albums/' + albumID);
          } else {
<<<<<<< HEAD
            $window.location.href = $window.location.href;
=======
            $window.location.reload();
>>>>>>> develop
          }
        } else {
          $rootScope.openCreate = false;
        }

        return false;
      };

      /**
       * @returns {boolean}
       */
      function validate() {
        if (!scope.content.name) {
          scope.form_error = 'Você precisa digitar um nome!';

          return false;
        }

        scope.form_error = '';

        return true;
      }
    }
  }
}());
