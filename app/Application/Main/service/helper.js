(function () {
  'use strict';

  angular.module('ZN.master')
    .factory('Helper', Helper);

  /**
   * @returns {{getNextElement: getNextElement, isArray: isArray, isMobile: isMobile}}
   *
   * @constructor
   */
  function Helper() {
    return {
      getNextElement: function (el) {
        // nextSibling can include text nodes
        function nextElementSibling(el) {
          do {
            el = el.nextSibling;
          } while (el && el.nodeType !== 1);
          return el;
        }

        return el.nextElementSibling || nextElementSibling(el);
      },
      isArray: function (arg) {
        if (!Array.isArray) {
          Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
          };
        }

        return Array.isArray(arg);
      },
      isMobile: function () {
        return {
          Android: function () {
            return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
          },
          any: function () {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
          }
        }
      }
    }
  }
}());
