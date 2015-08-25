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
        
        //$scope.focusAreas = !$scope.obj.areaOfFocus ? false:true;

        if($scope.obj.educationPercentage > 0 || $scope.obj.financialStabilityPercentage > 0 || $scope.obj.healthPercentage > 0){
          $scope.focusAreas = true;
        }
        
        $scope.otherOrgFlag = $scope.obj.organizationDonations.length > 0 ? true:false;

        //$scope.donationFrequency = $scope.obj.biweeklyDeduction === null ? 'reset' : 'biweekly'; 

        if($scope.obj.biweeklyDeduction === null && $scope.obj.oneTimeDeduction === null){
          $scope.donationFrequency = 'reset';
        }

        if($scope.obj.biweeklyDeduction !== null){
          $scope.donationFrequency = 'biweekly';
        }

        if($scope.obj.oneTimeDeduction !== null){
          $scope.donationFrequency = 'onetime';
        }


        if($scope.otherOrgFlag){
        
          _.each($scope.obj.organizationDonations, function(obj, index){
              switch(index){
                case 0:
                  $scope.firstOrg = obj.organization;
                  $scope.firstOrgPercentage = obj.percentage;
                  break;

                case 1:
                  $scope.secondOrg = obj.organization;
                  $scope.secondOrgPercentage = obj.percentage;
                  break;

                case 2:
                  $scope.thirdOrg = obj.organization;
                  $scope.thirdOrgPercentage = obj.percentage;
                  break;
              }
          });
        

        } else {
          $scope.firstOrg = pledge.new_organization(null);
          $scope.obj.organizationDonations.push($scope.firstOrg);

          $scope.secondOrg = pledge.new_organization(null);
          $scope.obj.organizationDonations.push($scope.secondOrg);
 
          $scope.thirdOrg = pledge.new_organization(null);
          $scope.obj.organizationDonations.push($scope.thirdOrg);
        }

    }, function(error){
        $scope.obj = pledge.new_pledge(null);

    });


    


    $scope.loadOrganizations = function(organization, index){
      $http.get(endpoints.pledgeUrl + '/employee/' + $scope.eid);
      promise.then(function(data){

        organization = pledge.new_organization(data.data[0].organizationDonations[index])
  
      }, function(error){

          console.log(error);
      });
    }

    $scope.resetDeduction = function(){
      if($scope.donationFrequency == 'reset'){
        $scope.obj.biweeklyDeduction = null;
        $scope.obj.oneTimeDeduction = null;
        $scope.obj.deductionType = null;
        $scope.donationFrequency = 'reset';
      }
    }

    
    $scope.save = function(){
      console.log(" save .... ");
      validateOrganizations();


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

      for(var i = copy.length - 1; i > 0; i--){
        if (copy[i].organization == "" || _.isNull(copy[i].organization)){
          removeOrganization(i);
        }
      }
    }

    function removeOrganization(index){
      $scope.obj.organizationDonations.splice(index,1); 
    }

    $scope.percentageTotal = function(){

      if($scope.focusAreas){
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

        $scope.orgTotal = parseInt($scope.firstOrg.percentage) + parseInt($scope.secondOrg.percentage) + parseInt($scope.thirdOrg.percentage);
        //Validates field based on the value contained in $scope.orgTotal.
        $scope.unitedway_form.orgPercentages.$setValidity("percentages", $scope.orgTotal == 100);
      } else {
        //Reset fields and validation if checkbox is unchecked.
        $scope.firstOrg.organization = null;
        $scope.firstOrg.percentage = 0;
        $scope.secondOrg.organization = null;
        $scope.secondOrg.percentage = 0;
        $scope.thirdOrg.organization = null;
        $scope.thirdOrg.percentage = 0;
        $scope.unitedway_form.orgPercentages.$setValidity("percentages", true);
      }
    }

  }]);
