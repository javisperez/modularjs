'use strict';

/**
 * <%= camelCaseName %> Module
 *
 * @module  <%= camelCaseName %>
 * @description
 * @author
 */

angular.module('<%= camelCaseName %>', [])

    .config(function ($menuProvider, $routeProvider) {

        $menuProvider.item({
            url: '<%= slugName %>',
            label: '<%= capitalizedName %>',
            icon: 'fa-area-chart',
            order: 1
        });

        $routeProvider.when('/<%= slugName %>', {
            title: '<%= capitalizedName %>',
            templateUrl: 'app/<%= folderName %>/Views/<%= studlyName %>.html',
            controller: '<%= studlyName %>Controller'
        });

    };
