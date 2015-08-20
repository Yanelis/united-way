'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$scope', 'pledge', 'portalService', '$http', 'endpoints', '$filter', function ($scope, pledge, portalService, $http, endpoints, $filter) {
    //$scope.obj = {};
    $scope.fasttrackenroll = "N";
    

    $scope.eid = portalService.getUserId();
    
    var promise = $http.get(endpoints.pledgeUrl + '/employee/' + $scope.eid);
    promise.then(function(data){
        $scope.obj = pledge.new_pledge(data.data[0]);


        //Flags to set required fields on the form.
        $scope.leadershipCircleFlag = false;
        $scope.familyGiftFlag = !$scope.obj.spouseAmt ? false:true;
        $scope.fastTrackFlag = !$scope.obj.fastTrackPlan ? false:true;
        $scope.communityPlanFlag = !$scope.obj.communityPlan ? false:true;
        $scope.focusAreas = !$scope.obj.areaOfFocus ? false:true;
        $scope.otherOrgFlag = $scope.obj.organizationDonations.length > 0 ? true:false;

        $scope.donationFrequency = !$scope.obj.biweeklyDeduction ? 'onetime':'biweekly';


        $scope.org1 = $scope.addOrganization();
        $scope.org2 = $scope.addOrganization();
        $scope.org3 = $scope.addOrganization();



        if($scope.obj.educationPercentage || $scope.obj.healthPercentage || $scope.obj.financialStabilityPercentage){
          $scope.areaOfFocus = true;
        }


    }, function(error){
        $scope.obj = pledge.new_pledge(null);

    });


    $scope.resetDeduction = function(){
      if($scope.donationFrequency == 'reset'){
        $scope.obj.biweeklyDeduction = null;
        $scope.obj.oneTimeDeduction = null;
        $scope.donationFrequency = 'reset';
      }
    }

    
    $scope.save = function(){
      console.log(" save .... ");
      validateOrganizations();

      if($scope.obj.oneTimeDeduction){
        $scope.obj.oneTimeDeduction = convertToDouble($scope.obj.oneTimeDeduction);
      }

      if($scope.obj.biweeklyDeduction){
        $scope.obj.biweeklyDeduction = convertToDouble($scope.obj.biweeklyDeduction);
      }


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


    function convertToDouble(num){
      return parseInt(num.replace(/\,/g, ''));
    }

    
    function validateOrganizations(){
      //Fancy deep copy of array using underscore.
      var copy = _.map($scope.obj.organizationDonations, _.clone);

      _.each(copy, function(obj, index){
        if(!obj.organization){
          removeOrganization(index);
        }
      })
    }

    function removeOrganization(index){
      $scope.obj.organizationDonations.splice($scope.obj.organizationDonations[index],1); 
    }

    $scope.percentageTotal = function(){

      if($scope.communityPlanFlag){
        $scope.total = parseInt($scope.obj.educationPercentage) + parseInt($scope.obj.financialStabilityPercentage) + parseInt($scope.obj.healthPercentage);
        $scope.unitedway_form.percentages.$setValidity("percentages", $scope.total == 100);
      } else {
        //Reset fields and validation if checkbox is unchecked.
        $scope.obj.educationPercentage = 0;
        $scope.obj.financialStabilityPercentage = 0;
        $scope.obj.healthPercentage = 0;
        $scope.unitedway_form.percentages.$setValidity("percentages", true);
      }
    }


    $scope.otherPercentageTotal = function(){

      if($scope.otherOrgFlag){

        $scope.orgTotal = parseInt($scope.org1.percentage) + parseInt($scope.org2.percentage) + parseInt($scope.org3.percentage);

        //Validates field based on the value contained in $scope.orgTotal.
        $scope.unitedway_form.orgPercentages.$setValidity("percentages", $scope.orgTotal == 100);
      } else {
        //Reset fields and validation if checkbox is unchecked.
        $scope.org1.organization = '';
        $scope.org1.percentage = 0;
        $scope.org2.organization = '';
        $scope.org2.percentage = 0;
        $scope.org3.organization = '';
        $scope.org3.percentage = 0;
        $scope.unitedway_form.orgPercentages.$setValidity("percentages", true);
      }

    }


  }]);
