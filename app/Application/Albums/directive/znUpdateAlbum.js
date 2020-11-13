(function () {
  'use strict';

  angular
    .module('ZN.albums')
    .directive('znUpdateAlbum', znUpdateAlbum);

  znUpdateAlbum.$inject = ['UpdateAlbum', '$location'];

  /**
   * @param UpdateAlbum
   * @param $location
   *
   * @returns {{restrict: string, link: link}}
   */
  function znUpdateAlbum(UpdateAlbum, $location) {
    return {
      restrict: 'AE',
      link: link
    };

    /**
     * @param scope
     */
    function link(scope) {
      /**
       * Create a new album
       *
       * @param albumID
       *
       * @returns {boolean}
       */
      scope.update = function (albumID) {
        var uploadedItens = document.querySelectorAll('.js-album-item');
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

        //Set the album and images
        albumData.album = {};
        albumData.images = [];
        albumData.album.visibility = scope.privacityOption;
        albumData.album.name = scope.vm.detail.album.name;
        albumData.album.location = scope.vm.detail.album.location
          ? scope.vm.detail.album.location.originalObject
            ? scope.vm.detail.album.location.originalObject.name || scope.vm.detail.album.location.originalObject
            : scope.vm.detail.album.location.name || ''
          : '';
        albumData.album.description = scope.vm.detail.album.description;

        if (scope.privacityOption !== 'public') {
          if (scope.vm.detail.album.share) {
            var ar_groups = [];
            var ar_users = [];

            angular.forEach(scope.vm.detail.album.share, function (group) {
              if (group.type == 'user') {
                ar_users.push(group.id);
              } else if (group.type == 'group') {
                ar_groups.push(group.id);
              }
            });

            albumData.album.share = {};

            if (ar_groups.length >= 1) {
              albumData.album.share.groups = ar_groups;
            }

            if (ar_users.length >= 1) {
              albumData.album.share.users = ar_users;
            }
          }
        }

        //Get the album tags values
        var albumTags = scope.vm.detail.album.tags;

        if (albumTags) {
          var concatAlbumTags = '';
        }

        angular.forEach(albumTags, function (tag) {
          concatAlbumTags = concatAlbumTags + tag.tag + ',';
        });

        concatAlbumTags = concatAlbumTags.substring(0, concatAlbumTags.length - 1);
        albumData.album.tags = concatAlbumTags;

        /**
         * Get the value of all images
         * Push the values to [albumData.images] array
         */
        (function () {
          var date;
          var description;
          var author;
          var id;
          var imageIndex;

          for (i; i < uploadedItens.length; i++) {
            id = uploadedItens[i].getAttribute('data-id');
            date = uploadedItens[i].querySelector('.js-date').value;
            // location = uploadedItens[i].querySelector('.js-thumb-location').value;
            author = uploadedItens[i].querySelector('.js-author').value;
            description = uploadedItens[i].querySelector('.js-description').value;

            imageIndex = albumData.images.push({
              id: id,
              date: scope.vm.detail.photos[i].noDate ? '0' : scope.vm.detail.photos[i].formatted_date,
              location: scope.vm.detail.photos[i].location
                ? (scope.vm.detail.photos[i].location.originalObject
                  ? (scope.vm.detail.photos[i].location.originalObject.name || scope.vm.detail.photos[i].location.originalObject)
                  : (scope.vm.detail.photos[i].location.name || ''))
                : '',
              owner: scope.vm.detail.photos[i].owner
                ? (scope.vm.detail.photos[i].owner.originalObject
                  ? (scope.vm.detail.photos[i].owner.originalObject.name || scope.vm.detail.photos[i].owner.originalObject)
                  : (scope.vm.detail.photos[i].owner.name || ''))
                : '',
              tags: [],
              description: description
            });

            //Get the album tags values
            var imageTags = scope.vm.detail.photos[i].tags;

            if (imageTags) {
              var concatImageTags = '';
            }

            angular.forEach(imageTags, function (tag) {
              concatImageTags = concatImageTags + tag.tag + ',';
            });
            concatImageTags = concatImageTags.substring(0, concatImageTags.length - 1);
            albumData.images[imageIndex - 1].tags = concatImageTags;
          }
        }());

        /**
         * Send the request
         * This function needs two parameters
         * [imagesData] - Array with info of all images
         * [albumData] - Object with info of album
         */

        var requestData = {
          id: albumID,
          album: albumData
        };

        UpdateAlbum.edit(requestData).then(function (res) {
          if (res.album) {
            scope.cancel(res.album.id);
          }
        });
      };

      scope.delete = function () {
        var modal = angular.element(document.querySelectorAll('.js-delete-album'));
        modal.addClass('zuni-dialog--open');
      };

      /**
       * [Cancel]
       *
       * @param id
       *
       * @returns {boolean}
       */
      scope.cancel = function (id) {
        if (id) {
          $location.path('/albums/' + id);
        } else {
          $location.path('/albums');
        }

        return false;
      };


      /**
       * [Validate input field]
       *
       * @return {boolean}
       */
      function validate() {
        if (!scope.vm.detail.album.name) {
          scope.form_error = 'Você precisa digitar um nome!';

          return false;
        }

        scope.form_error = '';

        return true;
      }
    }
  }
})();
