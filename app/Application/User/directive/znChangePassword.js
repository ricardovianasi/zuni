(function() {
	'use strict';

	angular
		.module('ZN.user')
		.directive('znChangePassword', znChangePassword);

	znChangePassword.$inject = ['ChangePassword'];

	function znChangePassword(ChangePassword){
		return{
			restrict: 'AC',
			link: link
		}

		function link(scope, element) {
			/**
			 * Open change password
			 */
			scope.change = false;
			scope.changePasswordFail = false;

			scope.password = {
				oldPass: '',
				pass: '',
				confirmPass: ''
			}

			scope.openChange = function() {
				scope.change = true;
			}

			/**
			 * Change password
			 */

			scope.changePassword = function() {
				var userPassword = scope.password;

				if (userPassword.oldPass === '' || userPassword.pass === '' || userPassword.confirmPass === '') {
					return false;
				}

				ChangePassword(userPassword).then(function(res) {
					if (res.updatePassword.error) {
						scope.err = res.updatePassword;
					} else {
						scope.success = res.updatePassword;

						setTimeout(function() {
							scope.cancelChange();
						}, 1000);
					}					
				});
			}

			/**
			 * Cancel change password
			 */
			scope.cancelChange = function() {
				scope.change = false;

				scope.password = {
					oldPass: '',
					pass: '',
					confirmPass: ''
				}
			}
		}
	}
}());
