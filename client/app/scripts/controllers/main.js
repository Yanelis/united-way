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


    //$scope.obj.organizationDonations.push("test");
    $scope.obj.spouseAmt = '';

    //Flags to set required fields on the form. 
    $scope.leadershipCircleFlag = false;
    $scope.familyGiftFlag = $scope.obj.spouseAmt != null ? true:false;
    $scope.fastTrackFlag = $scope.obj.fastTrackPlan != null ? true:false;
    $scope.communityPlanFlag = $scope.obj.communityPlan != null ? true:false;
    $scope.focusAreas = $scope.obj.areaOfFocus != null ? true:false;
    $scope.otherOrgFlag = $scope.obj.organizationDonations.length > 0 ? true:false;



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

    $scope.$broadcast('runCustomValidations', {
      forms: ['unitedway_form']
    })


  });
