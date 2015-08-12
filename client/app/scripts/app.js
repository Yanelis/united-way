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
    'ngTouch',
    'directives.customvalidation.customValidationTypes'
  ])

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/login.html'
      })
      .when('/logout',{
        controller: 'LogoutController',
        templateUrl: 'views/login.html'
      })
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'views/main.html'
      })

      .otherwise({ redirectTo: '/login' });
  }])
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });
    }]);
