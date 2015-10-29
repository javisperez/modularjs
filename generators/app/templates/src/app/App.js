'use strict';

angular.module('<%= _.camelCase(appname) %>', [

  // Vendors
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ngRoute',
  <% if (bootstrap) { %>'ui.bootstrap',<% } else { %>'ngMaterial',<% } %>
  'toastr',
  'angular-loading-bar',

  // Modules
  'header',
  'footer',
  'home'

])

  .config(function ($routeProvider) {

      $routeProvider.otherwise({
           redirectTo: '/'
      });

  })

  .controller('MainCtrl', function () {

  });
