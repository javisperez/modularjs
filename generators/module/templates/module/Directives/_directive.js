'use strict';

/**
 * <%= directiveName %> directive
 *
 * @module <%= moduleName %>
 * @description
 * @author
 */

angular.module('<%= moduleName %>')

    .directive('<%= directiveName %>', function () {

        return {
            restrict: 'AE',
            scope: {},
            templateUrl: 'app/<%= folderName %>/Directives/Template.html',
            link: function ($scope) {

            }
        };

    });
