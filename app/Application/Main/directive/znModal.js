(function() {
    'use strict';

    angular
        .module('ZN.master')
        .directive('znModal', znModal);

    function znModal() {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'app/Application/Main/views/znModal.html'
        }
    }
}());
