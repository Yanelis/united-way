'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ThanksCtrl', ['$scope', 'ngStorage', function ($scope, $localStorage) {

    $scope.donation = $localStorage.donation;

  }]);
