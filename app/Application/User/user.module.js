(function () {
  'use strict';

  angular
    .module('ZN.user', [])
    .config(Router);

  Router.$inject = ['$routeProvider'];

  /**
   * @param $routeProvider
   *
   * @constructor
   */
  function Router($routeProvider) {
<<<<<<< HEAD
=======
    console.log($routeProvider);
>>>>>>> develop
    $routeProvider
      .when('/user', {
        templateUrl: 'app/Application/User/views/user.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          User: retrieveUser
        }
      })
      .when('/user/manager', {
        templateUrl: 'app/Application/User/views/manager.html',
        controller: 'UserManagerController',
        controllerAs: 'vm',
        resolve: {
          User: retrieveUsers,
          Groups: retrieveGroups
        }
      })
      .when('/user/profiles', {
        templateUrl: 'app/Application/User/views/profiles.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        resolve: {
          Profiles: retrieveProfiles
        }
      })
      .otherwise({
<<<<<<< HEAD
        redirectTo: '/albums'
=======
        redirectTo: '/login'
>>>>>>> develop
      });
  }
}());

/*
 * GET THE USER
 */
retrieveUser.$inject = ['GetUser'];

/**
 * @param GetUser
 *
 * @returns {*}
 */
function retrieveUser(GetUser) {
  return GetUser();
}

/*
 * GET THE USERS
 */
retrieveUsers.$inject = ['GetUsers'];

/**
 * @param GetUsers
 *
 * @returns {*}
 */
function retrieveUsers(GetUsers) {
  return GetUsers();
}

/*
 * GET THE GROUPS
 */
retrieveGroups.$inject = ['GetGroups'];

/**
 * @param GetGroups
 *
 * @returns {*}
 */
function retrieveGroups(GetGroups) {
  return GetGroups();
}

/*
 * GET THE PROFILES
 */
retrieveProfiles.$inject = ['GetProfiles'];

/**
 * @param GetProfiles
 *
 * @returns {*}
 */
function retrieveProfiles(GetProfiles) {
  return GetProfiles();
}
