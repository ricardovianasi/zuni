(function() {
    'use strict';

    angular
        .module('ZN.search', [])
        .config(routes);

    routes.$inject = ['$routeProvider'];

    function routes($routeProvider) {
        $routeProvider
        /**
         * SEARCH ROUTES
         */
        .when('/search/:query', {
            templateUrl: 'app/Application/Search/views/search.html',
            controller: 'search',
            controlerAs: 'search'
        })
    }
}());
