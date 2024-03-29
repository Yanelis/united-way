/**
 * Created by david492000 on 6/29/15.
 */
'use strict';

angular.module('clientApp')

  .controller('LoginController',
  ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
      // reset login status
      AuthenticationService.ClearCredentials();

      $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function (response) {
          if (response.success) {
            AuthenticationService.SetCredentials($scope.username, $scope.password);
            $location.path('/');
          } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
            AuthenticationService.ClearCredentials();
          }
        });
      };
    }]).controller('LogoutController', ['$scope','AuthenticationService', function($scope, AuthenticationService ){
    AuthenticationService.ClearCredentials();
  }]);
