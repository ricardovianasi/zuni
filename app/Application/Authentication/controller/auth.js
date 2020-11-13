(function () {
  'use strict';

  angular.module('ZN.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$rootScope', '$location', 'AuthService', '$timeout'];

  /**
   * @param $scope
   * @param $rootScope
   * @param $location
   * @param AuthService
   * @param $timeout
   *
   * @constructor
   */
  function AuthController($scope, $rootScope, $location, AuthService, $timeout) {
    console.log('... AuthController');

    //Credentials
    this.credentials = {
      email: '',
      password: '',
      rememberSession: 1
    };

    $scope.rememberMyUser = false;

    /**
     * @param credentials
     */
    this.userIsValid = function (credentials) {
      //Is the user select the button -> keep connected
      var saveCurrentUser = $scope.rememberMyUser;

      AuthService.login(credentials, saveCurrentUser).then(function (resp) {
        if (resp.user) {
          /**
           * Redirect user
           */
          //Set the roles
          $rootScope.userRoles = resp.user.list_permissions;

          $timeout(function () {
            $rootScope.$apply(function () {
              $location.path('/');
            });
          }, 150)

        } else if (resp.login.error) {
          alert('Senha incorreta...');
        }
      });
    };

    //Redirect the user for recover password page
    this.recoverPassword = function () {
      $location.path('login/recover-password');
    }
  }
}());

/**
 * USERS
 * ricardovianasi@gmail.com
 */
// //ALBUMS

// 0: "getList"                  // Visualizar álbums dele ou compartilhado com ele
// 1: "getListSuper"             // Visualizar álbums de qualquer usuario
// 2: "get"                      // Acesso ao álbum dele ou compartilhado com ele
// 3: "getSuper"                 // Acesso a qualquer álbum
// 4: "getAlbumExternalShare"    // Acesso a álbum externo
// 5: "create"                   // Criar álbum
// 6: "update"                   // Atualizar álbum
// 7: "updateSuper"              // Atualizar qualquer álbum
// 8: "changeVisibility"
// 9: "changeVisibilitySuper"

// //GROUPS

// 0: "create"
// 1: "get"
// 2: "getList"
// 3: "update"
// 4: "delete"
// 5: "active"


// //IMAGE

// 0: "get"
// 1: "getSuper"
// 2: "getList"
// 3: "getListSuper"
// 4: "update"
// 5: "updateSuper"
// 6: "move"
// 7: "copy"
// 8: "delete"
// 9: "deleteList"
// 10: "download"

// //PROFILE

// 0: "getList"
// 1: "get"
// 2: "create"
// 3: "update"
// 4: "delete"
// 5: "active"

// //UPLOAD

// 0: "create"

// //USERS

// 0: "getList"
// 1: "get"
// 2: "create"
// 3: "update"
// 4: "delete"
// 5: "active"
// 6: "updateAvatar"
// 7: "updatePassword"


// //Administrador
// //Escritor
// //Leitor
