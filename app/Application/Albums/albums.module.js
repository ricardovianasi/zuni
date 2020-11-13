(function () {
  'use strict';

  angular.module('ZN.albums', [
      'ZN.tags',
      'angularFileUpload',
      'ui.select',
      'ngSanitize',
      'angucomplete-alt'
    ])
    .config(Router);

  Router.$inject = ['$routeProvider', '$httpProvider'];

  /**
   * @param $routeProvider
   *
   * @constructor
   */
  function Router($routeProvider) {
    $routeProvider
      .when('/albums', {
        templateUrl: 'app/Application/Albums/views/albums.html',
        controller: 'AlbumsController',
        controllerAs: 'vm',
        resolve: {
          Albums: retrieveAlbums,
          LocationHints: getLocationHints,
          AuthorHints: getAuthorHints
        }
      })
      .when('/albums/edit/:albumID', {
        templateUrl: 'app/Application/Albums/views/album-edit.html',
        controller: 'AlbumEditController',
        controllerAs: 'vm',
        resolve: {
          AlbumInfo: getAlbumInfo,
          LocationHints: getLocationHints,
          AuthorHints: getAuthorHints
        }
      })
      .when('/albums/:albumID', {
        templateUrl: 'app/Application/Albums/views/album-detail.html',
        controller: 'AlbumDetailsController',
        controllerAs: 'vm',
        resolve: {
          Album: retrieveAlbumDetail,
          LocationHints: getLocationHints,
          AuthorHints: getAuthorHints
        },
        reloadOnSearch: false
      })
      .when('/albums/:albumID/:photoID', {
        templateUrl: 'app/Application/Albums/views/photo-details.html',
        controller: 'PhotoDetailController',
        controllerAs: 'vm',
        resolve: {
          Photo: retrievePhoto,
          LocationHints: getLocationHints,
          AuthorHints: getAuthorHints
        }
      })
  }
}());

/*
 * GET THE ALBUMS
 */
getAuthorHints.$inject = ['GetHints'];

/**
 * @param GetHints
 *
 * @returns {*}
 */
function getAuthorHints(GetHints) {
  return GetHints.author();
}

/*
 * GET LOCATION HINTS
 */
getLocationHints.$inject = ['GetHints'];

/**
 * @param GetHints
 *
 * @returns {*}
 */
function getLocationHints(GetHints) {
  return GetHints.location();
}

/*
 * GET THE ALBUMS
 */
retrieveAlbums.$inject = ['GetAlbums'];

/**
 * @param GetAlbums
 *
 * @returns {*}
 */
function retrieveAlbums(GetAlbums) {
  return GetAlbums();
}

/*
 * GET THE ALBUM DETAIL
 */
retrieveAlbumDetail.$inject = ['GetAlbum', '$route'];

/**
 * @param GetAlbum
 * @param $route
 *
 * @returns {*}
 */
function retrieveAlbumDetail(GetAlbum, $route) {
  var id = $route.current.params.albumID;

  return GetAlbum(id);
}

/*
 * GET THE PHOTO DETAIL
 */
retrievePhoto.$inject = ['GetImage', '$route', '$location'];

/**
 * @param GetImage
 * @param $route
 *
 * @returns {*}
 */
function retrievePhoto(GetImage, $route) {
  var id = $route.current.params.photoID;

  return GetImage(id);
}

/*
 * GET THE INFO ABOUT ALBUM
 */
getAlbumInfo.$inject = ['EditHelper', '$location'];

/**
 * @param EditHelper
 * @param $location
 *
 * @returns {*}
 */
function getAlbumInfo(EditHelper, $location) {
  var hasInfo = EditHelper.getAlbumInfo();

  if (hasInfo) {
    return hasInfo;
  }

  $location.path('/albums');
}
