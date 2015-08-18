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


    $scope.org1 = pledge.new_organization(null);
    $scope.org2 = pledge.new_organization(null);
    $scope.org3 = pledge.new_organization(null);


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


    $scope.percentageTotal = function(){
      $scope.total = parseInt($scope.obj.educationPercentage) + parseInt($scope.obj.financialStabilityPercentage) + parseInt($scope.obj.healthPercentage);

      $scope.unitedway_form.percentages.$setValidity("percentages", $scope.total == 100)

    }


    $scope.otherPercentageTotal = function(){
      $scope.orgTotal = parseInt($scope.org1.percentage) + parseInt($scope.org2.percentage) + parseInt($scope.org3.percentage);

      $scope.unitedway_form.orgPercentages.$setValidity("percentages", $scope.orgTotal == 100)

    }


  });
