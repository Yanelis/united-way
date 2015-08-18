'use strict';

var app = angular.module('clientApp');

app.directive('setRequired', [function() {
  return {
      restrict: "A",
      link: function(scope, element, attrs, ctrl) {
          var input = element.find('input[ng-model]'); 
          if (input.length) {
              scope.$watch(function() {
                  return input.hasClass('ng-invalid');
              }, function(isInvalid) {
                  element.toggleClass('has-error', isInvalid);
              });
          }
      }
  };
}]);