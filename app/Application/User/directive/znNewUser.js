(function() {
    'use strict';

    angular
        .module('ZN.user')
        .directive('znNewUser', znNewUser);

    znNewUser.$inject = ['PostUser', 'Tags'];

    function znNewUser(PostUser, Tags) {
        return {
            restrict: 'AC',
            link: link
        }

        function link(scope, element) {
            scope.newUser = {
                name: '',
                email: '',
                origin: '',
                phone: '',
                expires_at: '',
            }

            scope.userModal = false;

            /**
             * Open Modal User
             */
            scope.openUserModal = function() {
                scope.userModal = true;
            }

            /**
             * Add User
             */
            scope.addUser = function() {
                var groups,
                    profiles;

                groups = Tags.getTagsValues('AddUserGroups', 0);
                profiles = Tags.getTagsValues('AddUserPerfil', 1);

                if (groups) scope.newUser.groups = groups;
                if (profiles) scope.newUser.profiles = profiles;

                PostUser(scope.newUser).then(function(resp) {
                	
                });
            }

            /**
             * Cancel Add User
             */
            scope.cancel = function() {
                scope.userModal = false;
            }
        }
    }
}());
