(function() {
	'use strict';

	angular
		.module('ZN.search')
		.directive('znSearch', znSearch);

	znSearch.$inject = ['$location'];

	function znSearch($location) {
		return {
			restrict: 'EA',
			link: link
		}

		function link($scope, $element) {
			var filters = {
				'Em todos os albums': 0,
				'Neste album': 1 
			};

			$scope.search = function(id) {
				var searchValue = document.querySelector('#search-text').value.trim(),
					hasOptions = document.querySelector('.header__search__options'),
					filterElement = document.querySelector('.filter-title');

				if (filterElement)
					var searchOption = filterElement.getAttribute('data-filter');

				if (hasOptions && filters[searchOption] === 1) {
					$location.path('/search/' + searchValue).search({album: id});
				} else {
					$location.path('/search/' + searchValue);
				}

				return false;
			}
		}
	}
}());
