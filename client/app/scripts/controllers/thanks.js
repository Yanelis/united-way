'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ThanksCtrl', ['$scope', function ($scope) {

    $scope.donation = JSON.parse(window.localStorage.getItem('donation'));

  }]);
