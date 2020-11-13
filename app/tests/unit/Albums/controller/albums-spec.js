describe('Controller: AlbumsCtrl', AlbumsCtrl);

function AlbumsCtrl() {
	var $scope, $controller;

	beforeEach(module('ZN', 'AlbumsMock'));

	beforeEach(inject(function(_$controller_, Albums) {
		$controller = _$controller_('AlbumsCtrl', {
			$scope: $scope,
			Albums: Albums
		});
	}));

	it('should be defined', function() {
		expect($controller).toBeDefined();
	});

	it('Should have one album', function() {
		expect($controller.albums.length).toEqual(1);
	});
}