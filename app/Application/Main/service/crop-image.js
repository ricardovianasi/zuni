(function () {
  'use strict';

  angular.module('ZN.master')
    .factory('CropImage', CropImage);

  CropImage.$inject = ['Helper'];

  /**
   * @param Helper
   *
   * @returns {Function}
   *
   * @constructor
   */
  function CropImage(Helper) {
    return function (size, list, name) {
      var imageItem,
        i = 0;

      if (arguments.length !== 3) {
        console.warn('CropImageService: |Error| Expect 3 parameters: (size/list/name)');

        return false;
      }

      //If list don't have itens
      if (!list) {
        console.log('Error: [webservice] images is null');
        // return false;
        list = [];
      }

      //If the list is an Array
      if (Helper.isArray(list)) {

        if (list.length <= 0) {
          imageItem = list[name];
          console.log('Nenhum album encontrado!');
        } else {
          imageItem = list[0][name];
          console.log('Carregando albuns...');
        }

        if (imageItem) {
          if (imageItem.indexOf(size) === -1) {
            for (i; i < list.length; i++) {

              var imageUrl = list[i][name].split('/size/'),
                imageUrlCrop;

              imageUrlCrop = imageUrl[0] + '/' + size + '/' + imageUrl[1];

              list[i][name] = imageUrlCrop;
            }
          }
        }

        //If the list is an Object
      } else {
        imageItem = list[name];

        if (imageItem) {
          if (imageItem.indexOf(size) === -1) {
            var imageUrl = list[name].split('/size/'),
              imageUrlCrop;

            imageUrlCrop = imageUrl[0] + '/' + size + '/' + imageUrl[1];

            list[name] = imageUrlCrop;
          }
        }
      }

      return list;
    }
  }
}());
