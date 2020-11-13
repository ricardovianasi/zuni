(function () {
  'use strict';

  angular.module('ZN.master')
    .controller('MasterController', MasterController);

  MasterController.$inject = ['$scope', 'AuthService', 'Helper', 'BASE'];

  /**
   * @param $scope
   * @param AuthService
   * @param Helper
   *
   * @constructor
   */
  function MasterController($scope, AuthService, Helper) {
    console.log('... MasterController');

    //Define the userRoles
    $scope.isAuthorized = AuthService.isAuthorized;
    //Verify if is a mobile device
    $scope.isMobile = !!Helper.isMobile().any();
  }
}());
