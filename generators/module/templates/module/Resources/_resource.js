'use strict';

/**
 * <%= resourceName %> Resource
 *
 * @module <%= moduleName %>
 * @description
 * @author
 */

angular.module('<%= moduleName %>')

    .factory('<%= resourceName %>', function ($resource, apiUrl) {
        var Resource;

        Resource = $resource(apiUrl('my/backend/service/'), {}, {

            get: {
                method: 'GET'
            },

            query: {
                method: 'GET',
                isArray: true,
                cache: true
            },

            update: {
                method: 'PUT'
            }
        });
    });
