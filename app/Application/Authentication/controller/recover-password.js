(function () {
  'use strict';

  angular.module('ZN.auth')
    .controller('RecoverPasswordController', RecoverPasswordController);

  RecoverPasswordController.$inject = ['$timeout', '$location', 'RecoverPassword'];

  /**
   * @param $timeout
   * @param $location
   * @param RecoverPassword
   *
   * @constructor
   */
  function RecoverPasswordController($timeout, $location, RecoverPassword) {
    console.log('... RecoverPasswordController');

    var successMessage = document.querySelector('.js-success-message');
    var errorMessage = document.querySelector('.js-error-message');

    //Credentials
    this.credentials = {
      email: ''
    };

    this.recoverPassword = function (credentials) {
      RecoverPassword(credentials).then(function (password) {
        if (password.forgetPassword.error) {
          errorMessage.style.display = 'block';

          $timeout(function () {
            errorMessage.style.display = 'none';
          }, 2500);

        } else {

          successMessage.style.display = 'block';

          //Delay for display message
          $timeout(function () {
            //Move user for the login page
            $location.path('/login');
          }, 2500);

        }
      });
    };
  }
}());
