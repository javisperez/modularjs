'use strict';

angular.module('config', [])

    .provider('apiUrl', function () {

        this.$get = function () {

            return function (uri) {
                return 'http://my.backend.api/api/v1/' + uri;
            };
        };
    });
