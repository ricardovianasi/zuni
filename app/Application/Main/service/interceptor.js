(function() {
    'use strict';

    angular
        .module('ZN.master')
        .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['$rootScope', '$q'];

    function AuthInterceptor($rootScope, $q) {
        return {
            responseError: function(response) {
            	var userFailObject = {
                    401: 'notAuthenticated',
                    419: 'sessionTimeout',
                    440: 'sessionTimeout'
                }

                if (userFailObject[response.status])
                	$rootScope.$emit('AuthFail', response);

                return $q.reject(response);
            }
        };
    }
}());
