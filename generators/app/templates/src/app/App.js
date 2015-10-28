'use strict';

angular.module('<%= _.camelCase(appname) %>', [

  // Vendors
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
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
