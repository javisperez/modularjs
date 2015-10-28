'use strict';

angular.module('home', [])

  .config(function ($routeProvider) {

      $routeProvider.when('/', {
           templateUrl: 'app/home/Views/Home.html'
      });

  });
