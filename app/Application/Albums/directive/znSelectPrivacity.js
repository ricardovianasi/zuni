(function () {
  'use strict';

  angular.module('ZN.albums')
    .directive('znSelectPrivacity', znSelectPrivacity);

  /**
   * @returns {{restrict: string, link: link, scope: {privacity: string}, templateUrl: string}}
   */
  function znSelectPrivacity() {
    return {
      restrict: 'EA',
      link: link,
      scope: {
        privacity: '=privacity'
      },
      templateUrl: 'app/Application/Albums/views/directives/znSelectPrivacity.html'
    };

    /**
     * @param scope
     * @param element
     * @param attrs
     */
    function link(scope, element, attrs) {
      var content = angular.element(element[0].querySelector('.privacity__select'));

      /**
       * Set the value of privacity
       * Public: true
       * Private: false
       */

      setPrivacityValue(scope.privacity);

      //OPEN PRIVACITY BOX
      scope.openOptions = function () {
        (content.hasClass('active')) ? content.removeClass('active') : content.addClass('active');
      };

      //SELECT ONE OPTIONS
      scope.selectPrivacity = function (option) {
        scope.openOptions();
        setPrivacityValue(option);
      };

      /**
       * @param privacity
       */
      function setPrivacityValue(privacity) {
        var inputValue = element[0].querySelector('.js-privacity-value');
        var inputOption = angular.element(element[0].querySelector('.js-privacity-option'));

        switch (privacity.toLowerCase()) {
          case 'public':
            scope.privacityText = 'Público';
            scope.$parent.privacityOption = 'public';

            break;
          case 'private':
            scope.privacityText = 'Privado';
            scope.$parent.privacityOption = 'private';

            break;
        }
      }

      //Define align
      scope.align = attrs.position;
    }
  }
}());
