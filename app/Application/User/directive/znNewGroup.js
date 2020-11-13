(function() {
    'use strict';

    angular
        .module('ZN.user')
        .directive('znNewGroup', znNewGroup);

    znNewGroup.$inject = ['PostGroup', 'Tags', '$window'];

    function znNewGroup(PostGroup, Tags, $window) {
        return {
            restrict: 'AC',
            link: link
        }

        function link(scope, element) {
            scope.newGroup = {
                name: '',
                description: ''
            }

            scope.groupModal = false;

            /**
             * Open Modal Group
             */
            scope.openGroupModal = function() {
                scope.groupModal = true;
            }

            /**
             * Add Group
             */
            scope.addGroup = function() {
                var users;

                //users = Tags.getTagsValues('AddUserPerfil', 1);

                //if (users) scope.newUser.users = users;
                //
                
                PostGroup(scope.newGroup).then(function(resp) {
                	if (resp.groupCreated)
                        scope.cancel(true);
                });
            }

            /**
             * Cancel Add Group
             */
            scope.cancel = function(reload) {
                scope.groupModal = false;

                scope.newGroup = {
                    name: '',
                    description: ''
                }

                if (reload)
                    $window.location.href = $window.location.href;
            }
        }
    }
}());
