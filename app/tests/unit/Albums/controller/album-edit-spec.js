describe('Controller: AlbumEditCtrl', AlbumEditCtrl);

function AlbumEditCtrl() {
	var $scope, $controller;

	beforeEach(module('ZN', 'AlbumsDetailsMock'));

	beforeEach(inject(function(_$controller_, Album) {
		$controller = _$controller_('AlbumEditCtrl', {
			AlbumInfo: Album
		});
	}));

	it('Should be defined', function() {
		expect($controller).toBeDefined();
	});


	it('Should have the album info', function() {
		expect($controller.detail.album.name).toEqual('Album 2');
		expect($controller.detail.photos.length).toEqual(1);
	});
};