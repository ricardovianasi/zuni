(function () {
  'use strict';

  angular.module('ZN.master', [])
    .config(AuthInterceptor)
    .run(RouteChangeAction);

  RouteChangeAction.$inject = ['$rootScope', '$location', 'SessionService'];

  /**
   * @param $rootScope
   * @param $location
   * @param SessionService
   *
   * @constructor
   */
  function RouteChangeAction($rootScope, $location, SessionService) {
    /**
     * Route change
     */
    $rootScope.$on('$routeChangeStart', function () {
      $rootScope.isLoading = true;

      //INTERCEPTOR STATUS
      $rootScope.$on('AuthFail', redirectToLogin);
    });

    $rootScope.$on('$routeChangeSuccess', function () {
      var token_access = SessionService.get();

      $rootScope.isLoading = false;

      if (!token_access.access || !token_access.token) {
        if (!$location.$path === '/login/recover-password') {
          $location.path('/login');
        }
      }
    });

    function redirectToLogin(e, value) {
      var path = $location.path();

      //Clean user cookie
      SessionService.destroy();

      if (path !== '/login')
        $location.path('/login');
    }
  }

  /**
   * Interceptor requests status
   */
  AuthInterceptor.$inject = ['$httpProvider'];

  function AuthInterceptor($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  }
}());
