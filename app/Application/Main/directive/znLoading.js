(function() {
	'use strict';

	angular
		.module('ZN.master')
		.directive('znLoading', znLoading);

	znLoading.$inject = ['$rootScope'];

	function znLoading($rootScope) {
		return {
			restrict: 'E',
			templateUrl: 'app/Application/Main/views/znLoading.html',
			scope: {
				action: '='
			}
		}
	}
}());