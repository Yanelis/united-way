'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, pledge) {
   //$scope.obj = {};
    $scope.fasttrackenroll = "N";
    $scope.obj = pledge.new_pledge(null);

    $scope.save = function(){
      console.log(" save .... ");
     $scope.obj.save().then(function(data){
       console.log("data was saved");

     }, function(error){
       console.log("error saving data");
     })
    }

    $scope.addOrganization = function(){

      var newOrg = pledge.new_organization(null);
      $scope.obj.organizationDonations.push(newOrg);
    }


  });
