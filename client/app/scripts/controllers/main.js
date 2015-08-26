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

        console.log(data);
        $scope.obj = pledge.new_pledge(data.data[0]);


        //Flags to set required fields on the form.
        $scope.leadershipCircleFlag = false;

        $scope.familyGiftFlag = !$scope.obj.spouseAmt ? false:true;
        $scope.familyGiftFlag = !$scope.obj.spouse ? false:true;
        $scope.familyGiftFlag = !$scope.obj.spouseEmployer ? false:true;

        $scope.fastTrackFlag = !$scope.obj.fastTrackPlan ? false:true;
        $scope.communityPlanFlag = !$scope.obj.communityPlan ? false:true;


        //Set the flag for focusAreas to true if the user has entered a percentage for any of the following three fields. 
        if($scope.obj.educationPercentage > 0 || $scope.obj.financialStabilityPercentage > 0 || $scope.obj.healthPercentage > 0){
          $scope.focusAreas = true;
        }
        
        //Set the flag for other organizations to true if the organizationDonations array has a value.
        $scope.otherOrgFlag = $scope.obj.organizationDonations.length > 0 ? true:false;


        //Set the donation type dropdown to the correct value based on the type of donation user has madae before.
        if($scope.obj.biweeklyDeduction === 0 && $scope.obj.oneTimeDeduction === 0){
          $scope.donationFrequency = 'reset';
        }

        if($scope.obj.biweeklyDeduction !== 0){
          $scope.donationFrequency = 'biweekly';
        }

        if($scope.obj.oneTimeDeduction !== 0){
          $scope.donationFrequency = 'onetime';
        }


        //If the otherOrg flag is set to true then we iterate over the organizationDonations array and populate the appropriate fields in the form.
        if($scope.otherOrgFlag){

          $scope.createOrganizations();
        
          //Iterating over the values in the array.
          _.each($scope.obj.organizationDonations, function(obj, index){

            //Populating the fields in the form with each object's values in the array.
              switch(index){
                case 0:
                  $scope.firstOrg = obj;
                  break;

                case 1:
                  $scope.secondOrg = obj;
                  break;

                case 2:
                  $scope.thirdOrg = obj;
                  break;
              }
          });
        
        } 

    }, function(error){
        $scope.obj = pledge.new_pledge(null);

    });


    $scope.createOrganizations = function(){
      $scope.firstOrg = $scope.addOrganization();
      $scope.secondOrg = $scope.addOrganization();
      $scope.thirdOrg = $scope.addOrganization();
    }


    $scope.loadOrganizations = function(organization, index){
      $http.get(endpoints.pledgeUrl + '/employee/' + $scope.eid);
      promise.then(function(data){

        organization = pledge.new_organization(data.data[0].organizationDonations[index])
  
      }, function(error){

          console.log(error);
      });
    }

    $scope.resetDeduction = function(){
        $scope.obj.biweeklyDeduction = 0;
        $scope.obj.oneTimeDeduction = 0;
        $scope.obj.deductionType = null;
    }
 

    $scope.save = function(){
      console.log(" save .... ");
      
      //Validating the other organization objects we created earlier. This will check for null or empty strings and will call removeOrganization(index) to remove them if found.
      if($scope.obj.organizationDonations.length > 0){
        validateOrganizations();
      }

      _.each($scope.obj.organizationDonations, function(obj, index){
        obj.percentage = convertToInt(obj.percentage);
      });


      //Check type and convert to numeric type when necessary.
      if (!_.isNumber($scope.obj.biweeklyDeduction)){
        $scope.obj.biweeklyDeduction = convertToDouble($scope.obj.biweeklyDeduction);
      }

      if (!_.isNumber($scope.obj.oneTimeDeduction)){
        $scope.obj.oneTimeDeduction = convertToDouble($scope.obj.oneTimeDeduction);
      }

      if (!_.isNumber($scope.obj.donationAmount)){
        $scope.obj.donationAmount = convertToDouble($scope.obj.donationAmount);
      }

      if (!_.isNumber($scope.obj.communityPlanPercentage)){
        $scope.obj.communityPlanPercentage = convertToInt($scope.obj.communityPlanPercentage);
      }

      if (!_.isNumber($scope.obj.educationPercentage)){
        $scope.obj.educationPercentage = convertToInt($scope.obj.educationPercentage);
      }

      if (!_.isNumber($scope.obj.financialStabilityPercentage)){
        $scope.obj.financialStabilityPercentage = convertToInt($scope.obj.financialStabilityPercentage)
      };

      if (!_.isNumber($scope.obj.healthPercentage)){
        $scope.obj.healthPercentage = convertToInt($scope.obj.healthPercentage);
      }

      if (!_.isNumber($scope.obj.spouseAmt)){
        $scope.obj.spouseAmt = convertToDouble($scope.obj.spouseAmt);
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
      return newOrg;
    }

    function convertToInt(num){
      return parseInt(num);
    }

    function convertToDouble(num){

      if(num.indexOf(',') > -1){
        return parseInt(num.replace(/\,/g, ''));
      }
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

    $scope.toggleFocusAreas = function(){
      if(!$scope.focusAreas){
        $scope.resetPercentageTotal();
      }
    }

    $scope.toggleFamilyGift = function(){
      if(!$scope.familyGiftFlag){
        $scope.resetFamilyGift();
      }
    }

    $scope.toggleLeadershipCircle = function(){
      if(!$scope.leadershipCircleFlag){
        $scope.resetLeadershipCircle();
      }
    }

    $scope.toggleOtherOrganizations = function(){
      if(!$scope.otherOrgFlag){
        $scope.resetOtherPercentageTotal();
      } else {
        if($scope.obj.organizationDonations.length == 0)
          $scope.createOrganizations();
      }
    }

    $scope.toggleCommunityPlan = function(){
      if(!$scope.communityPlanFlag){
        $scope.resetCommunityPlan();
      }
    }


    $scope.resetCommunityPlan = function(){
      $scope.obj.communityPlanPercentage = 0;
    }

    $scope.resetLeadershipCircle = function(){
      $scope.obj.donationAmount = 0;
    }


    $scope.resetFamilyGift = function(){
      $scope.obj.spouse = null;
      $scope.obj.spouseAmt = 0;
      $scope.obj.spouseEmployer = null;
    }

    $scope.percentageTotal = function(){
        $scope.total = parseInt($scope.obj.educationPercentage) + parseInt($scope.obj.financialStabilityPercentage) + parseInt($scope.obj.healthPercentage);

        //Validates field based on the value contained in $scope.total. "Percentages" is the error message that will display using ng-messages.
        $scope.unitedway_form.percentages.$setValidity("percentages", $scope.total == 100);
    }

    $scope.resetPercentageTotal = function(){
        $scope.obj.educationPercentage = 0;
        $scope.obj.financialStabilityPercentage = 0;
        $scope.obj.healthPercentage = 0;
        $scope.total = 0;
        $scope.unitedway_form.percentages.$setValidity("percentages", true);
    }

    $scope.resetOtherPercentageTotal = function(){
        $scope.firstOrg.organization = null;
        $scope.firstOrg.percentage = 0;
        $scope.secondOrg.organization = null;
        $scope.secondOrg.percentage = 0;
        $scope.thirdOrg.organization = null;
        $scope.thirdOrg.percentage = 0;
        $scope.obj.organizationDonations = [];
        $scope.orgTotal = 0;
        $scope.unitedway_form.orgPercentages.$setValidity("percentages", true);
    }



    $scope.otherPercentageTotal = function(){

        //Ensuring default values for the inputs.
        var firstOrgPercent = $scope.firstOrg.percentage == '' ? 0 : $scope.firstOrg.percentage;
        var secondOrgPercent = $scope.secondOrg.percentage == '' ? 0 : $scope.secondOrg.percentage;
        var thirdOrgPercent = $scope.thirdOrg.percentage == '' ? 0 : $scope.thirdOrg.percentage;

        $scope.orgTotal = parseInt(firstOrgPercent) + parseInt(secondOrgPercent) + parseInt(thirdOrgPercent);
        //Validates field based on the value contained in $scope.orgTotal. "Percentages" is the error message that will display using ng-messages.
        $scope.unitedway_form.orgPercentages.$setValidity("percentages", $scope.orgTotal == 100);

    }

  }]);
