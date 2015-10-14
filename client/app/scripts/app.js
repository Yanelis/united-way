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
    'ngMessages',
    'ngCacheBuster',
    'fcsa-number'
  ])

  .config(['$routeProvider', function ($routeProvider) {

    //httpRequestInterceptorCacheBusterProvider.setMatchList([/.*views.*/,/.*images.*/, /.*styles.*/]);

    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'views/main.html'
      })

      .when('/thank-you', {
        controller: 'ThanksCtrl',
        templateUrl: 'views/thanks.html'
      })

      .when('/error', {
        templateUrl: 'views/error.html'
      })

      .otherwise({ redirectTo: '/error' });
  }])
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      /*
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {

        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });
    */}]);
