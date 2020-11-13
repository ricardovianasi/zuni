(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znTags', znTags);

  znTags.$inject = ['Tags', '$timeout', '$rootScope'];

  /**
   * @param Tags
   * @param $timeout
   * @param $rootScope
   *
   * @returns {{restrict: string, templateUrl: string, scope: {tagsArray: string, syncMaster: string, syncChild: string, config: string}, link: link}}
   */
  function znTags(Tags, $timeout, $rootScope) {
    return {
      restrict: 'EA',
      templateUrl: 'app/Application/Albums/views/directives/znTags.html',
      scope: {
        tagsArray: '=tagsArray',
        syncMaster: '=syncMaster',
        syncChild: '=syncChild',
        config: '=config',
      },
      link: link
    };

    /**
     * @param scope
     * @param element
     *
     * @returns {boolean}
     */
    function link(scope, element) {
      //Get the input element for add new tags, and the input that contains all the values
      var inputTagsField;
      var inputTagsValue;
      var hintCount = 0;
      var _prefix = scope.config.prefix || 'tag';
      var _hint = scope.config.hint || 'tags';
      var _input = (scope.config.input !== false);
      var _namespace = scope.config.namespace;

      if (!_namespace) {
        console.warn('Tags Component must have a namespace config');

        return false;
      }

      //Define the scope object
      if (!$rootScope.znTagValue) {
        $rootScope.znTagValue = {};
      }

      var TAG = {
        /**
         * @returns {boolean}
         */
        keypress: function () {
          var _self = this;

          //When user press Enter Button
          inputTagsField.bind('keypress', function (e) {
            //Show autocomplete
            if (!scope.hintShow) {
              var hintFocus = 0;

              scope.hintShow = true;

              angular.element(document).bind('keydown', function (e) {
                var listItens = angular.element(element[0].querySelectorAll('.js-hint-item'));

                if (e.keyCode === 40) {
                  angular.element(listItens[hintCount - 1]).removeClass('active');
                  angular.element(listItens[hintCount]).addClass('active')[0].scrollIntoView(false);

                  (hintCount < listItens.length - 1) ? hintCount++ : false;

                  inputTagsField.val(angular.element(listItens[hintCount - 1]).text());
                  scope.tgValue = angular.element(listItens[hintCount - 1]).text();
                } else if (e.keyCode === 38) {
                  if (hintCount !== 0) {
                    (hintCount <= listItens.length - 1) ? hintCount-- : false;

                    angular.element(listItens[hintCount]).removeClass('active');
                    angular.element(listItens[hintCount && hintCount - 1]).addClass('active')[0].scrollIntoView(false);

                    inputTagsField.val(angular.element(listItens[hintCount && hintCount - 1]).text());
                    scope.tgValue = angular.element(listItens[hintCount && hintCount - 1]).text();
                  }
                }
              });
            }

            if (e.keyCode === 13 || e.keyCode === 44 || e.keyCode === 9) {
              var tagValue = scope.tgValue;
              var _tagModel = {};

              if (!_input) {
                var i = 0;

                for (i; i < scope.tagsHint.length; i++) {
                  if (tagValue === scope.tagsHint[i][_prefix]) {
                    _self.create(scope.tagsHint[i], true);

                    break;
                  }
                }
              } else {
                if (tagValue) {
                  _tagModel[_prefix] = tagValue;
                  _self.create(_tagModel, true);
                }
              }

              e.preventDefault();
            }
          });

          return false;
        },
        /**
         * @param value
         * @param apply
         *
         * @returns {boolean}
         */
        create: function (value, apply) {
          this.verifyValue(value[_prefix], apply, function (hasValue) {
            if (!hasValue) {
              //Create the tag
              var tagList = Tags.create(value, scope.tagsArray, _prefix);

              //Set the tag
              if (!tagList) {
                return false;
              }

              scope.tagsArray = tagList;
              scope.TAG.setValues(scope.tagsArray);

              //Reset input value
              inputTagsField.val('');

              //Hide hint
              scope.hintShow = false;
              scope.tgValue = '';

              hintCount = 0;

              if (apply)
                $timeout(function () {
                  scope.$apply();
                });

              if (scope.syncMaster) {
                scope.$emit('newTag', value);
              }
            }
          });

          return false;
        },
        /**
         * @param value
         * @param index
         *
         * @returns {boolean}
         */
        remove: function (value, index) {
          var ID = scope.config.ID;
          var i = 0;
          var tagIndex;

          if (index !== null) {
            tagIndex = index;
          } else {
            for (i; i < scope.tagsArray.length; i++) {
              if (scope.tagsArray[i][_prefix] === value[_prefix]) {
                tagIndex = i;

                break;
              }
            }
          }

          $rootScope.znTagValue[_namespace][ID].splice(tagIndex, 1);

          if (scope.syncMaster) {
            scope.$emit('removeTag', value);
          }

          return false;
        },
        /**
         * @param value
         * @param creationPhase
         *
         * @returns {boolean}
         */
        setValues: function (value, creationPhase) {
          var ID = scope.config.ID;

          //Create instance of tagsobjects
          if (creationPhase) {
            if (!$rootScope.znTagValue[_namespace]) {
              $rootScope.znTagValue[_namespace] = {};
              $rootScope.znTagValue[_namespace].prefix = _prefix;
            }
          }

          //Set the value
          $rootScope.znTagValue[_namespace][ID] = value;

          return false;
        },
        /**
         * @returns {boolean}
         */
        tagFieldFocus: function () {
          inputTagsField[0].focus();

          return false;
        },
        /**
         *
         */
        showMore: function () {
          scope.openBox = (scope.openBox) ? false : true;
        },
        /**
         * @param value
         * @param apply
         * @param fn
         *
         * @returns {boolean}
         */
        verifyValue: function (value, apply, fn) {
          var i = 0;
          var hasValue = false;

          //Clean input
          inputTagsField[0].value = '';

          if (value) {
            for (i; i < scope.tagsArray.length; i++) {
              if (value === scope.tagsArray[i][_prefix]) {
                hasValue = true;

                if (apply) {
                  scope.$apply(function () {
                    scope.hintShow = false;
                  });
                }

                break;
              }
            }

            if (typeof fn === 'function') {
              fn(hasValue);
            }

            return hasValue;
          }
        }
      };

      //SYNCRONIZED NEW VALUES
      if (scope.syncChild) {
        $rootScope.$on('newTag', function (e, value) {
          scope.TAG.create(value, true);
        });

        $rootScope.$on('removeTag', function (e, tag) {
          scope.TAG.remove(tag, null);
        });
      }

      $timeout(function () {
        inputTagsField = angular.element(element[0].querySelector('.js-tags-field'));
        inputTagsValue = angular.element(element[0].querySelector('.js-tags-values'));

        var hint = Tags.hint(_hint);

        hint.then(function (tags) {
          scope.tagsHint = tags;
        });

        scope.tagsArray = (scope.tagsArray || []);

        scope.TAG = TAG;

        //Set the default values
        scope.TAG.setValues(scope.tagsArray, true);

        //Set the fixed option
        (scope.config.fixed) ? scope.fixed = true : scope.fixed = false;

        scope.TAG.keypress();
      }, 500);
    }
  }
})();
