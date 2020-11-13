describe('Controller: PhotoDetailCtrl', PhotoDetailCtrl);

function PhotoDetailCtrl() {
	var $scope, $controller;

	beforeEach(module('ZN', 'AlbumsDetailsPhotoMock'));

	beforeEach(inject(function(_$controller_, $rootScope, Photo) {
		$scope = $rootScope.$new();
		$controller = _$controller_('PhotoDetailCtrl', {
			Photo: Photo,
			$scope: $scope
		});
	}));

	it('Should be defined', function() {
		expect($controller).toBeDefined();
	});
}