(function () {
  'use strict';

  angular.module('ZN.auth', [])
    .config(Router)
    .run(AuthInjector);

  Router.$inject = ['$routeProvider'];

  /**
   * @param $routeProvider
   *
   * @constructor
   */
  function Router($routeProvider) {
    $routeProvider
    /**
     * AUTH ROUTES
     */
      .when('/login', {
        templateUrl: 'app/Application/Authentication/views/auth.html',
        controller: 'AuthController',
        controllerAs: 'auth',
        resolve: {
          auth: VerifyAuth
        }
      })
      .when('/login/recover-password', {
        templateUrl: 'app/Application/Authentication/views/recover-password.html',
        controller: 'RecoverPassword',
        controllerAs: 'authRecover'
      })
      .when('/logout', {
        resolve: {
          logout: Logout
        },
        redirectTo: '/login'
      })
  }

  /**
   * Verify if user is already authenticated
   */
  VerifyAuth.$inject = ['SessionService', '$location', '$rootScope', '$timeout'];

  /**
   * @param SessionService
   * @param $location
   * @param $rootScope
   * @param $timeout
   *
   * @returns {boolean}
   *
   * @constructor
   */
  function VerifyAuth(SessionService, $location, $rootScope, $timeout) {
    var token_access = SessionService.get();

<<<<<<< HEAD
    if (token_access.token) {
=======
    if ('token' in token_access) {
>>>>>>> develop
      if ($location.path('/login')) {
        $timeout(function () {
          $rootScope.$apply(function () {
            $location.path('/albums');
          })
        })
      }
    } else {
      return true;
    }
  }


  /**
   * [$inject description]
   * @type {Array}
   */
  Logout.$inject = ['$location', 'AuthService'];

  /**
   * @param $location
   * @param AuthService
   *
   * @constructor
   */
  function Logout($location, AuthService) {
    AuthService.logout().then(function (res) {
      if (res.logout) {
        $location.path('/login');
      }
    });
  }

  /**
   * Inject token in all requests
   */
  AuthInjector.$inject = ['$http', '$injector', 'SessionService'];

  /**
   * @param $http
   * @param $injector
   * @param SessionService
   *
   * @constructor
   */
  function AuthInjector($http, $injector, SessionService) {
    $injector.get('$http').defaults.transformRequest = function (data, headersGetter) {
      var token_access = SessionService.get();
      var headers = headersGetter();

      if (token_access.access || token_access.token) {
        headers['Authorization'] = token_access.token;
      }

      if (data) {
        return data;
      }
    }
  }
}());
