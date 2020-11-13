(function() {
	'use strict';

	angular
		.module('ZN.user')
		.directive('znChangePicture', znChangePicture);

	function znChangePicture(){
		return{
			restrict: 'AC',
			link: link
		}

		function link(scope, element) {
			/**
			 * Cancel user picture
			 */
			scope.changePicture = function() {
				var inputElement = element[0].querySelector('input[type="file"]');
				inputElement.click();
			}
		}
	}
}());
