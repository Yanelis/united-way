'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$scope', 'pledge', 'portalService', '$http', 'endpoints', '$filter', '$location', function ($scope, pledge, portalService, $http, endpoints, $filter, $location) {
    //$scope.obj = {};
    $scope.fasttrackenroll = "N";
    $scope.donationAmount = 0;
    
    $scope.eid = portalService.getUserId();

    if ($scope.eid.indexOf('e') > -1){
      $scope.employeeID = $scope.eid.substring(1, $scope.eid.length);
    } else {
      $scope.employeeID = $scope.eid;
    }

    var d = new Date();

    var employee = $http.get(endpoints.pledgeUrl + '/employee/' + $scope.employeeID + '/info?buster=' + d.getTime());
    
    employee.then(function(data){

      $scope.employee = pledge.new_employee(data.data);

    }, function(error){

        var emp = {
          firstName: 'Test',
          lastName: 'Data',
          Department: 'testDept'
        }

        $scope.employee = pledge.new_employee(emp);

    });

    var promise = $http.get(endpoints.pledgeUrl + '/employee/' + $scope.eid + '?buster=' + d.getTime());
    promise.then(function(data){

        //console.log(data);
        $scope.obj = pledge.new_pledge(data.data[0]);

        //Flags to set required fields on the form.
        $scope.leadershipCircleFlag = false;

        $scope.familyGiftFlag = !$scope.obj.spouseAmt ? false:true;
        $scope.familyGiftFlag = !$scope.obj.spouse ? false:true;
        $scope.familyGiftFlag = !$scope.obj.spouseEmployer ? false:true;

        if($scope.obj.fastTrackPlan != undefined || !_.isNull($scope.obj.fastTrackPlan)){
          $scope.fastTrackPlanType = $scope.obj.fastTrackPlan;
          $scope.fastTrackFlag = false;
          $scope.fastTrackPlanFlag = true;
        }

        //$scope.fastTrackPlanFlag = !$scope.obj.fastTrackPlan ? false:true;

        $scope.communityPlanFlag = true;

        if($scope.obj.biweeklyDeduction > 0){
          $scope.deductionType = 'biweekly';
        } 

        if($scope.obj.oneTimeDeduction > 0){
          $scope.deductionType = 'onetime';
        }

        if($scope.obj.oneTimeDeduction == 0 && $scope.obj.biweeklyDeduction == 0){
          $scope.deductionType = 'reset';
        }

        //Set the flag for focusAreas to true if the user has entered a percentage for any of the following three fields. 
        //if($scope.obj.educationPercentage > 0 || $scope.obj.//financialStabilityPercentage > 0 || $scope.obj.healthPercentage > 0){
        //  $scope.focusAreas = true;
        //}
        
        //Set the flag for other organizations to true if the organizationDonations array has a value.
        $scope.otherOrgFlag = $scope.obj.organizationDonations.length > 0 ? true:false;

        if($scope.otherOrgFlag){

            if(!_.isUndefined($scope.obj.organizationDonations[0])){
              $scope.firstOrg = $scope.obj.organizationDonations[0];
            } else {
              $scope.firstOrg = $scope.addOrganization();
            }

  
  
            if(!_.isUndefined($scope.obj.organizationDonations[1])){
              $scope.secondOrg = $scope.obj.organizationDonations[1];
            } else {
              $scope.secondOrg = $scope.addOrganization();
            }
  
  
            if(!_.isUndefined($scope.obj.organizationDonations[2])){
              $scope.thirdOrg = $scope.obj.organizationDonations[2];
            } else {
              $scope.thirdOrg = $scope.addOrganization();
            }

        }

        $scope.calculateTotalAnnualDonation();


        $scope.obj.eid = $scope.eid;

        if(!_.isNull($scope.obj.email)){
          $scope.unitedway_form.$valid = true;
        }

        if($scope.donationAmount > 1000){
          $scope.leadershipCircleFlag = true;
        }


    }, function(error){

        $location.path("/error");

    });

    //Use both one time and biweekly values to calculate the total donation amount.

    $scope.calculateTotalAnnualDonation = function(){

        //if(otd.indexOf(',') > -1){
          $scope.otDonation = "" + $scope.obj.oneTimeDeduction;
          $scope.otDonation.replace(/\,/g,'');
        //}

        //if(bwd.indexOf(',') > -1){
          $scope.bwDonation = "" + $scope.obj.biweeklyDeduction;
          $scope.bwDonation.replace(/\,/g,'');
        //}


        //Making sure a value is defined.
        if($scope.obj.oneTimeDeduction == undefined){
          $scope.obj.oneTimeDeduction = 0;
        }

        if($scope.obj.biweeklyDeduction == undefined){
          $scope.obj.biweeklyDeduction = 0;
        }


        $scope.obj.oneTimeDeduction = $scope.obj.oneTimeDeduction == '' ? 0 : $scope.obj.oneTimeDeduction;
        //var biweekly = $scope.obj.biweeklyDeduction == '' ? 0 : $scope.obj.biweeklyDeduction;
        $scope.obj.biweeklyDeduction = $scope.obj.biweeklyDeduction == '' ? 0 : $scope.obj.biweeklyDeduction;

        //$scope.obj.spouseAmt = $scope.obj.spouseAmt = '' ? 0: $scope.obj.spouseAmt;

        $scope.donationAmount = parseFloat($scope.obj.oneTimeDeduction) + parseFloat($scope.obj.spouseAmt) + (parseFloat($scope.obj.biweeklyDeduction) * 26);
    }


    $scope.exitFastTrack = function(){
      if(!$scope.obj.fastTrackFlag){
        $scope.fastTrackPlanType = '';
        $scope.obj.fastTrackPlan = false;
      }
    }

    $scope.addOrganizationFromData = function(json){
      var newOrg = pledge.new_organization(json);
      $scope.obj.organizationDonations.push(newOrg);
    }

    $scope.addOrganization = function(){
      var newOrg = pledge.new_organization(null);
      $scope.obj.organizationDonations.push(newOrg);
      return newOrg;
    }


    $scope.createOrganizations = function(){
      $scope.firstOrg = $scope.addOrganization();
      $scope.secondOrg = $scope.addOrganization();
      $scope.thirdOrg = $scope.addOrganization();
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


    $scope.loadOrganizations = function(organization, index){
      $http.get(endpoints.pledgeUrl + '/employee/' + $scope.eid);
      promise.then(function(data){i

        organization = pledge.new_organization(data.data[0].organizationDonations[index])
  
      }, function(error){

          //console.log(error);
      });
    }

    $scope.validateDeductionType = function(){
      if($scope.obj.oneTimeDeduction > 0 && !$scope.obj.oneTimeDeductionDescription){
        $scope.unitedway_form.oneTimeDeductionDescription.$setValidity("selectOne", false);
      } else {
        $scope.unitedway_form.oneTimeDeductionDescription.$setValidity("selectOne", true);
      }

      if($scope.obj.biWeeklyDeduction > 0 && !$scope.obj.biweeklyDeduction){
        $scope.unitedway_form.biweeklyDeductionDescription.$setValidity("selectOne", false);
      } else {
        $scope.unitedway_form.biweeklyDeduction.$setValidity("selectOne", true);
      }
    }

    $scope.validateDeduction = function(){

      $scope.calculateTotalAnnualDonation();

      //$scope.validateDeductionType();

      if($scope.donationAmount < 1000){
        $scope.leadershipCircleFlag = 0;
      }

    }

    $scope.resetDeduction = function(){
        $scope.obj.biweeklyDeduction = 0;
        $scope.obj.oneTimeDeduction = 0;
        $scope.obj.biweeklyDeductionDescription = null;
        $scope.obj.oneTimeDeductionDescription = null;
        $scope.leadershipCircleFlag = false;

        $scope.calculateTotalAnnualDonation();
    }
 

    $scope.save = function(){
      //console.log(" save .... ");
      
      //Validating the other organization objects we created earlier. This will check for null or empty strings and will call removeOrganization(index) to remove them if found.
      if($scope.obj.organizationDonations.length > 0){
        validateOrganizations();
      }

      _.each($scope.obj.organizationDonations, function(obj, index){
        obj.percentage = convertToInt(obj.percentage);
      });


      //Check type and convert to numeric type when necessary.
      if (!_.isUndefined($scope.obj.biweeklyDeduction)  && !_.isNumber($scope.obj.biweeklyDeduction)){
        $scope.obj.biweeklyDeduction = removeCommas($scope.obj.biweeklyDeduction);
      }

      if (!_.isUndefined($scope.obj.oneTimeDeduction)  && !_.isNumber($scope.obj.oneTimeDeduction)){
        $scope.obj.oneTimeDeduction = removeCommas($scope.obj.oneTimeDeduction);
      }

      if (!_.isUndefined($scope.donationAmount)  && !_.isNumber($scope.obj.donationAmount)){
        $scope.obj.donationAmount = removeCommas($scope.obj.donationAmount);
      }

      if (!_.isUndefined($scope.obj.communityPlanPercentage)  && !_.isNumber($scope.obj.communityPlanPercentage)){
        $scope.obj.communityPlanPercentage = convertToInt($scope.obj.communityPlanPercentage);
      }

      if (!_.isUndefined($scope.obj.educationPercentage)  && !_.isNumber($scope.obj.educationPercentage)){
        $scope.obj.educationPercentage = convertToInt($scope.obj.educationPercentage);
      }

      if (!_.isUndefined($scope.obj.financialStabilityPercentage)  && !_.isNumber($scope.obj.financialStabilityPercentage)){
        $scope.obj.financialStabilityPercentage = convertToInt($scope.obj.financialStabilityPercentage)
      };

      if (!_.isUndefined($scope.obj.healthPercentage)  && !_.isNumber($scope.obj.healthPercentage)){
        $scope.obj.healthPercentage = convertToInt($scope.obj.healthPercentage);
      }

      if (!_.isUndefined($scope.obj.spouseAmt)  && !_.isNumber($scope.obj.spouseAmt)){
        $scope.obj.spouseAmt = removeCommas($scope.obj.spouseAmt);
      }

      //Calculate amount and create object to display on thank you page.
      var amount = (parseFloat($scope.obj.biweeklyDeduction) * 26) + parseFloat($scope.obj.oneTimeDeduction);

      $scope.setDonationFrequency();

      $scope.obj.fastTrackPlan = $scope.fastTrackPlanType;

      var donation = {
        'donor': $scope.employee.firstName + ' ' + $scope.employee.lastName,
        'amount': amount,
        'frequency': $scope.donationFrequency
      };

      //Save object to localstorage to access it from thank you page.
      window.localStorage.setItem('donation', JSON.stringify(donation));

     $scope.obj.save().then(function(data){
       //console.log("data was saved");

       $location.path("/thank-you");
       $location.hash("top");

     }, function(error){
       //console.log("error saving data");
       $location.path("/error");
     })
    }

    $scope.setDonationFrequency = function() {
      //if($scope.obj.biweeklyDeduction > 0 && $scope.obj.oneTimeDeduction > 0)
      //{
      //  $scope.donationFrequency = "bi-weekly contribution of $" + $scope.obj.//biweeklyDeduction + " and one time contribution of $" + $scope.obj.//oneTimeDeduction + " are ";
      //}

      if($scope.obj.biweeklyDeduction == 0 && $scope.obj.oneTimeDeduction == 0){
        $scope.deductionType = 'reset';
      }


      if($scope.obj.biweeklyDeduction > 0){
        $scope.deductionType = 'biweekly';
        $scope.donationFrequency = "bi-weekly contribution of $" + $scope.obj.biweeklyDeduction + " is";
      }

      if($scope.obj.oneTimeDeduction > 0){

        $scope.deductionType = 'onetime';
        $scope.donationFrequency = "one time contribution of $" + $scope.obj.oneTimeDeduction + " is";
      }
    }

    function convertToInt(num){
      return parseInt(num);
    }

    function removeCommas(num){

      if(num && num.indexOf(',') > -1){
        num =  parseFloat(num.replace(/\,/g, '')).toFixed(2);
      } else {
        num = parseFloat(num).toFixed(2);
      }

      return num;
    }


    //$scope.toggleFocusAreas = function(){
    //  if(!$scope.focusAreas){
    //    $scope.resetPercentageTotal();
    //  }
    //}

    $scope.toggleFamilyGift = function(){
      if(!$scope.familyGiftFlag){
        $scope.resetFamilyGift();
        $scope.calculateTotalAnnualDonation();
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

      $scope.validatePercentages();
    }

    $scope.toggleCommunityPlan = function(){
      if(!$scope.communityPlanFlag){
        $scope.resetCommunityPlan();
        $scope.validatePercentages();
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


  $scope.validatePercentages = function(){

    $scope.percentageTotal();


      if($scope.otherOrgFlag){
        $scope.otherPercentageTotal();
        $scope.orgTotal = $scope.total + $scope.orgTotal;
      } else {
        $scope.orgTotal = $scope.total;
      }

      $scope.unitedway_form.orgPercentages.$setValidity("percentages", $scope.orgTotal == 100);
  }

    $scope.percentageTotal = function(){

        //Ensuring default values for the inputs.
        var communityPercent = $scope.obj.communityPlanPercentage == '' ? 0 : $scope.obj.communityPlanPercentage;
        var educationPercent = $scope.obj.educationPercentage == '' ? 0 : $scope.obj.educationPercentage;
        var financialStabilityPercent = $scope.obj.financialStabilityPercentage == '' ? 0 : $scope.obj.financialStabilityPercentage;
        var healthPercent = $scope.obj.healthPercentage == '' ? 0 : $scope.obj.healthPercentage;

        $scope.total = parseInt(communityPercent) + parseInt(educationPercent) + parseInt(financialStabilityPercent) + parseInt(healthPercent);

        //console.log('community: ', parseInt(communityPercent));
        //console.log('education: ', parseInt(educationPercent));
        //console.log('financial: ', parseInt(financialStabilityPercent));
        //console.log('health: ', parseInt(healthPercent));
//
        //console.log('Percentage total:', $scope.total);

    }



    $scope.otherPercentageTotal = function(){

        //Ensuring default values for the inputs.
        var firstOrgPercent = $scope.firstOrg.percentage == '' ? 0 : $scope.firstOrg.percentage;
        var secondOrgPercent = $scope.secondOrg.percentage == '' ? 0 : $scope.secondOrg.percentage;
        var thirdOrgPercent = $scope.thirdOrg.percentage == '' ? 0 : $scope.thirdOrg.percentage;

        $scope.orgTotal = parseInt(firstOrgPercent) + parseInt(secondOrgPercent) + parseInt(thirdOrgPercent);

        //console.log('Other Percentage total:', $scope.total);

    }



  }]);
