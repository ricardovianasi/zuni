(function () {
  'use strict';

  angular.module('ZN', [
    //Vendors module
    'ngRoute',
    'ngCookies',
    'ngSanitize',
<<<<<<< HEAD
=======
    'angularUtils.directives.dirPagination',
>>>>>>> develop

    //Core module
    'ZN.core',
    'ZN.master',
    'ZN.albums',
    'ZN.auth',
    'ZN.search',
    'ZN.user'
  ]);
}());
