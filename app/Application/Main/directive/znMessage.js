(function() {
    'use strict';

    angular
        .module('ZN.master')
        .directive('znMessage', znMessage);

    function znMessage() {
        return {
            restrict: 'EA',
            templateUrl: 'app/Application/Main/views/znMessage.html',
            scope: {
            	state: '=state'
            },
            transclude: true,
            link: link
        }

        function link(scope, element, attrs) {
        	scope.close = function() {
        		scope.state = false;
        	}
        }
    }
}());
