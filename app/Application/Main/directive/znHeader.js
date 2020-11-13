(function (){
	'use strict';

	angular
		.module('ZN.master')
		.directive('znHeader', znHeader);

	function znHeader() {
		return {
			restrict: 'E',
			templateUrl: 'app/Application/Main/views/znHeader.html',
			scope: {
				filter: '=filter',
				album: '=album',
				user: '=user'
			},
			link: link
		}

		function link($scope, $element) {
			var defaultSearch = '';

			//Show/Hide filter
			$scope.showFilter = $scope.filter;

			//CHANGE LAYOUT MODEL TO LIST OR GRID
			$scope.setLayout = function(type) {
				var albumBtnAdd = document.querySelector('.js-add-photo'),
					albums = document.querySelectorAll('.js-album-item'),
					layoutType = type,
					i = 0;

				if ($scope[type + 'Active']) {
					return false;
				}

				if (layoutType === 'List') {
					//Add class when button is clicked
					$scope.ListActive = true;
					$scope.GridActive = false;

					angular.element(albumBtnAdd).addClass('btn-model-list');

					//Layout
					for (i; i < albums.length; i++) {
						angular.element(albums[i]).addClass('album-model-list');
					}

				} else {
					//Add class when button is clicked
					$scope.ListActive = false;
					$scope.GridActive = true;

					angular.element(albumBtnAdd).removeClass('btn-model-list');

					//Layout
					for (i; i < albums.length; i++) {
						angular.element(albums[i]).removeClass('album-model-list');
					}
				}
			};

			//OPEN SETTINGS
			$scope.openSettings = function(e) {
				angular.element(e.target).toggleClass('active');
				e.stopImmediatePropagation();
			};

			$scope.showFilters = function(e) {
				var filters = document.querySelector('.header__search__options'),
					listFilters = angular.element(filters.querySelector('ul')),
					filterButton = angular.element(document.querySelector('.js-select-filter'));

				angular.element(e.target).toggleClass('active');

				listFilters.toggleClass('active');

				//Save the dafult name
				if (defaultSearch) {
					filterButton[0].innerText = defaultSearch;
				} else {
					defaultSearch = filterButton[0].innerText;
				}

				e.preventDefault();
			};

			$scope.selectFilter = function(e) {
				var filters = document.querySelector('.header__search__options'),
					filterButton = angular.element(document.querySelector('.js-select-filter')),
					listFilters = angular.element(filters.querySelector('ul')),
					value = e.target.innerText;

				//Set the value
				filterButton[0].innerText = value;
				filterButton[0].setAttribute('data-filter', value);

				//Remove classes
				listFilters.removeClass('active');
				filterButton.removeClass('active');

				e.preventDefault();
			}
		}
	}
}());