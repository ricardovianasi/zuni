(function() {
    'use strict';

    angular
        .module('ZN.tags', [])
        .factory('Tags', Tags);

    Tags.$inject = ['$q', '$window', 'GetTags', 'GetGroups', 'GetProfiles', '$rootScope'];

    function Tags($q, $window, GetTags, GetGroups, GetProfiles, $rootScope) {
        return {
            create: function(value, tags, prefix, fn) {

                if (!value || !prefix || typeof tags !== 'object')
                    return false;

                /**
                 * Generate tag ID
                 */
                if (prefix === 'tag') {
                    value['id'] = this.generateID(tags);
                }

                tags.push(value);

                if (typeof fn === 'function')
                    fn(tag);

                return tags;
            },
            generateID: function(tags) {
                var i = 0;

                if (!tags)
                    return false;

                if (tags.length === 0) {
                    return 1;
                }

                return tags[tags.length - 1].id + 1;
            },
            hint: function(hint) {
                var defer = $q.defer();

                if (!hint)
                    return false;

                /**
                 * VERIFY IF HINT IS A TAG
                 */
                if (hint === 'tags') {
                    var hasTags = $window.sessionStorage.getItem('tagsHint'),
                        hintResult;

                    GetTags.tags().then(function(tags) {
                        angular.forEach(tags, function(tag) {
                            tag.name = tag.tag;
                        });
                        $window.sessionStorage.setItem('tagsHint', JSON.stringify(tags));
                        defer.resolve(tags);
                    });
                    // if (!hasTags) {
                    //     //Retrieve the tags list
                    //     GetTags.tags().then(function(tags) {
                    //         $window.sessionStorage.setItem('tagsHint', JSON.stringify(tags));
                    //         defer.resolve(tags);
                    //     });
                    // } else {
                    //     hintResult = JSON.parse($window.sessionStorage.getItem('tagsHint'));
                    //     defer.resolve(hintResult);
                    // }
                }

                if (hint === 'share') {
                    var hasTags = $window.sessionStorage.getItem('tagsShare'),
                        hintResult;

                    if (!hasTags) {
                        //Retrieve the tags list
                        GetTags.share().then(function(tags) {
                            $window.sessionStorage.setItem('tagsShare', JSON.stringify(tags));
                            defer.resolve(tags);
                        });
                    } else {
                        hintResult = JSON.parse($window.sessionStorage.getItem('tagsShare'));
                        defer.resolve(hintResult);
                    }
                }

                if (hint === 'groups') {
                    var hasTags = $window.sessionStorage.getItem('tagsGroups'),
                        hintResult;

                    if (!hasTags) {
                        //Retrieve the tags list
                        GetGroups().then(function(groups) {
                            $window.sessionStorage.setItem('tagsGroups', JSON.stringify(groups));
                            defer.resolve(groups);
                        });
                    } else {
                        hintResult = JSON.parse($window.sessionStorage.getItem('tagsGroups'));
                        defer.resolve(hintResult);
                    }
                }

                if (hint === 'profiles') {
                    var hasTags = $window.sessionStorage.getItem('tagsProfiles'),
                        hintResult;

                    if (!hasTags) {
                        //Retrieve the tags list
                        GetProfiles().then(function(profiles) {
                            $window.sessionStorage.setItem('tagsProfiles', JSON.stringify(profiles));
                            defer.resolve(profiles);
                        });
                    } else {
                        hintResult = JSON.parse($window.sessionStorage.getItem('tagsProfiles'));
                        defer.resolve(hintResult);
                    }
                }

                return defer.promise;
            },
            getTagsValues: function(namespace, id, options) {
                var _tagsValues = [],
                    i = 0;

                if (!namespace || id === undefined) {
                    console.warn('getTagsValues: Must have 3 parameters (namespace, id)');
                    return false;
                }

                /**
                 * Get the tag object
                 */
                var _tagObject = $rootScope.znTagValue;

                if (_tagObject[namespace]) {
                    var albumTags = _tagObject[namespace][id],
                        prefix = _tagObject[namespace].prefix;

                    if (options && options.filter) {
                        var filter = options.filter,
                            filterObject,
                            f = 0;

                        for (f; f < filter.length; f++) {

                            _tagsValues[filter[f]] = [];

                            for (i; i < albumTags.length; i++) {
                                if (albumTags[i].type === filter[f]) {
                                    _tagsValues[filter[f]].push(albumTags[i][prefix]);
                                }
                            }

                            i = 0;
                        }
                    } else {
                        for (i; i < albumTags.length; i++) {
                            _tagsValues.push(albumTags[i][prefix]);
                        }
                    }

                    return _tagsValues
                }
                return false;
            }
        }
    }
}());
