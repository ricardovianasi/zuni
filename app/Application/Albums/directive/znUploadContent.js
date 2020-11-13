(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znUploadContent', znUploadContent);

  znUploadContent.$inject = ['$timeout', 'GetHints', 'GetTags', 'GetUsers', 'GetGroups', '$q'];

  /**
   * @param $timeout
   * @param GetHints
   * @param GetTags
   * @param GetUsers
   * @param GetGroups
   * @param $q
   *
   * @returns {{restrict: string, scope: {content: string, upload: string, groups: string}, templateUrl: string, link: link}}
   */
  function znUploadContent($timeout, GetHints, GetTags, GetUsers, GetGroups, $q) {
    return {
      restrict: 'EA',
      scope: {
        content: '=content',
        upload: '=upload',
        groups: '=groups'
      },
      templateUrl: 'app/Application/Albums/views/directives/znUploadContent.html',
      link: link
    };

    /**
     * @param scope
     */
    function link(scope) {
      GetHints.location().then(function (data) {
        scope.LocationHints = data;
      });

      GetHints.author().then(function (data) {
        scope.AuthorHints = data;
      });

      GetTags.tags().then(function (data) {
        scope.TagsHints = data;
      });

      scope.UsersGroupsHints = [];

      $q.all({
        groups: GetGroups(),
        users: GetUsers()
      }).then(function (data) {
        scope.UsersGroupsHints = data.users;
        scope.UsersGroupsHints.concat(data.groups);
      });

      /**
       * @param name
       *
       * @returns {{tag: Array, name: Array}}
       */
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

      $timeout(function () {
        angular.forEach(scope.upload, function (fileItem) {
          if (fileItem) {
            if (fileItem.tags == undefined || fileItem.tags == []) {
              fileItem.tags = newValue;
            }
          }
        });
      });

      scope.$watch('content.tags', function (newValue, oldValue) {
        angular.forEach(scope.upload, function (fileItem) {
          if (fileItem) {
            if (fileItem.tags == oldValue || fileItem.tags == [] || fileItem.tags == undefined) {
              fileItem.tags = newValue;
            }
          }
        });
      });

      scope.$watch('content.location', function (newValue, oldValue) {
        var elementLocationArr = document.querySelectorAll('.js-thumb-location');
        var oldObjValue;
        var newObjValue;

        if (oldValue) {
          if (oldValue.name) {
            oldObjValue = oldValue.name;
          }

          if (oldValue.title && oldValue.originalObject) {
            oldObjValue = oldValue.title;
          }

          if (!oldValue.title && oldValue.originalObject) {
            oldObjValue = oldValue.originalObject;
          }
        }

        if (newValue) {
          if (newValue.name) {
            newObjValue = newValue.name;
          }

          if (newValue.title && newValue.originalObject) {
            newObjValue = newValue.title;
          }

          if (!newValue.title && newValue.originalObject) {
            newObjValue = newValue.originalObject;
          }
        }

        if (newObjValue) {
          angular.forEach(elementLocationArr, function (elementLocation, key) {
            if (elementLocation) {

              if (elementLocation.value === oldObjValue || elementLocation.value === '') {
                elementLocation.value = newObjValue;

                var _fileItem = scope.upload[key];

                _fileItem.location = {
                  name: newObjValue
                }
              }
            }
          })
        }
      });
    }
  }
}());
