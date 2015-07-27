'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'views/main.html'
      })

      .otherwise({ redirectTo: '/login' });
  }])
