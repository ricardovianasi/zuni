(function() {
	'use strict';

	angular
	.module('ZN.master')
	.directive('znScroll', znScroll);

	znScroll.$inject = ['$rootScope'];

	function link (scope, elem, attrs) {
		//Checa se está no topo da janela, e mostra o botão
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('.scrollToTop').fadeIn();
			} else {
				$('.scrollToTop').fadeOut();
			}
		});

		elem.bind('click', function() {
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
	}

	function znScroll($rootScope) {
		return {
			restrict: 'AE',
			link: link,
			templateUrl: 'app/Application/Main/views/znScroll.html'
		}
	}

}());
