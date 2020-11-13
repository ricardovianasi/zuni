(function () {
  'use strict';

  angular.module('ZN.albums')
    .factory('EditHelper', EditHelper);

  /**
   * @returns {{saveAlbumInfo: saveAlbumInfo, getAlbumInfo: getAlbumInfo, cleanAlbumInfo: cleanAlbumInfo}}
   *
   * @constructor
   */
  function EditHelper() {
    var albumData = null;

    return {
      /**
       * @param info
       * @param fn
       *
       * @returns {boolean}
       */
      saveAlbumInfo: function (info, fn) {
        if (info)
          albumData = info;

        if (typeof fn === 'function')
          fn();

        return false;
      },
      /**
       * @returns {*}
       */
      getAlbumInfo: function () {
        return albumData;
      },
      /**
       *
       */
      cleanAlbumInfo: function () {
        albumData = null;
      }
    }
  }
}());
