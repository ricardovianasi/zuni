(function() {
    'use strict';

    angular
        .module('ZN.user')
        .directive('znDeleteGroup', znDeleteGroup);

    znDeleteGroup.$inject = ['DeleteGroup', '$window'];

    function znDeleteGroup(DeleteGroup, $window) {
        return {
            restrict: 'AC',
            link: link
        }

        function link(scope, element) {
            var groupID = null;

            scope.deleteGroupModal = false;

            scope.openDeleteGroupModal = function(id) {
                scope.deleteGroupModal = true;
                groupID = id;
            }

            scope.confirmDeleteGroup = function() {
                if (!groupID) {
                    console.warn('Para deletar um grupo, você deve passar um ID');
                    return false;
                }

                DeleteGroup(groupID).then(function(res) {
                    if (res.profiles.deleted)
                        scope.cancelDelete();
                });
            }

            scope.cancelDelete = function() {
                scope.deleteGroupModal = false;
                groupID = null;
            }
        }
    }
}());
