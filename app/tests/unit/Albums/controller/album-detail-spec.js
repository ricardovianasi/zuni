describe('Controller: AlbumDetailsCtrl', AlbumDetailsCtrl);

function AlbumDetailsCtrl() {
	var $scope, $controller;

	beforeEach(module('ZN', 'AlbumsDetailsMock'));

	beforeEach(inject(function(_$controller_, Album) {
		$controller = _$controller_('AlbumDetailsCtrl', {
			Album: Album
		});
	}));

	it('To be defined', function() {
		expect($controller).toBeDefined();
	});

	it('Should have the album info', function() {
		expect($controller.detail.album.name).toEqual('Album 2');
	});
}