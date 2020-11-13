(function() {
    'use strict';

    angular
        .module('ZN.master')
        .directive('znDateMask', znDateMask);

    znDateMask.$inject = ['$timeout', '$parse'];

    function znDateMask($timeout, $parse) {
        return {
            restrict: 'A',
            link: link,
            require: 'ngModel'
        }

        function link(scope, element, attr, ngModel) {
            // scope.blurr = function () {
                
                
            //     $timeout(function(){
            //         // var model = attr['ngModel'];
            //         // scope.$parent[model] = 'jajaja';
            //         // scope.$apply();
            //         ngModel.$setViewValue('jajaja');
            //         console.log('q',ngModel.$viewValue)
            //     })
                

            // }

            if (element[0].tagName === 'INPUT') {
                
                element.bind('keypress', function(e) {

                    var rere = scope.$eval(attr.ngModel);
                    console.log('q',rere)

                    var valueLenght = element[0].value.split('').length;
                    var maskObject = [2, 5];

                    if (maskObject.indexOf(valueLenght) !== -1) {
                        element[0].value += '/';
                        ngModel.$setViewValue(element[0].value)
                    }
                });
            }
        }
    }
}());