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
    //$scope.donationAmount = 0;
    
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

      if($scope.employee.email){
        $scope.unitedway_form.email.$setValidity("email", true);
      }

    }, function(error){

        var emp = {
          firstName: 'Test',
          lastName: 'Data',
          Department: 'testDept'
        }

        $scope.employee = pledge.new_employee(emp);

    });

    var promise = $http.get(endpoints.pledgeUrl + '/employee/' + $scope.employeeID + '?buster=' + d.getTime());
    promise.then(function(data){

        //console.log(data);
        $scope.obj = pledge.new_pledge(data.data[0]);

        //Flags to set required fields on the form.
        $scope.leadershipCircleFlag = false;
        $scope.fastTrackFlag = false;

        $scope.familyGiftFlag = $scope.obj.spouseAmt == 0 ? false:true;

        if(/^\s+$/.test($scope.obj.spouseAmt) || !$scope.obj.spouseAmt){
          $scope.familyGiftFlag = false;
        }


        if(/^\s+$/.test($scope.obj.spouseEmployer) || !$scope.obj.spouseEmployer){
          $scope.familyGiftFlag = false;
        }

        $scope.donationAmount = parseFloat($scope.obj.oneTimeDeduction) + parseFloat($scope.obj.spouseAmt) + (parseFloat($scope.obj.biweeklyDeduction) * 26) + parseFloat($scope.fastTrackAmount);

        //Checks if the user is already enrolled in the fast track plan.
        if($scope.obj.fastTrackPlan != undefined || !_.isNull($scope.obj.fastTrackPlan) || $scope.obj.fastTrackPlan != 'nothing'){
          $scope.fastTrackPlanType = $scope.obj.fastTrackPlan;
          $scope.fastTrackPlanFlag = true;

        }

        if(_.isNull($scope.obj.fastTrackPlan) || $scope.obj.fastTrackPlan == 'nothing'){
          $scope.fastTrackPlanFlag = false;
          $scope.fastTrackFlag = false;
        } else {
          $scope.fastTrackPlanFlag = true;
          $scope.fastTrackFlag = true;

          $scope.resetDeduction();
        }

        //Setting the value for the excellence club field.
        if($scope.obj.excellenceTwoPctFlag){
          $scope.biweekly = true;
          $scope.showBiweeklyDropdown = true;
          $scope.biweeklyAmount = "two-percent";
        }

        if($scope.obj.excellenceOnePctFlag){
          $scope.biweekly = true;
          $scope.showBiweeklyDropdown = true;
          $scope.biweeklyAmount = "one-percent";
        }

        //if(!_.isNull($scope.obj.biweeklyDeductionDescription) && !_.isUndefined($scope.obj.//biweeklyDeductionDescription)){
        //  $scope.biweekly = true;
        //  $scope.showBiweeklyDropdown = true;
        //  $scope.biweeklyAmount = 'otherAmount';
        //}

        //Setting the community Plan Flag to true.
        $scope.communityPlanFlag = $scope.obj.communityPlan;
        $scope.obj.communityPlanPercentage = $scope.obj.communityPlanPercentage == '' ? 0 : $scope.obj.communityPlanPercentage;

        if($scope.obj.communityPlanPercentage > 0){
          $scope.validatePercentages ();
        }

        if($scope.obj.educationPercentage > 0){
          $scope.validatePercentages();
        }

        if($scope.obj.financialStabilityPercentage > 0){
          $scope.validatePercentages();
        }

        if($scope.obj.healthPercentage > 0){
          $scope.validatePercentages();
        }


        //Setting bi-weekly deduction type.
        if($scope.obj.biweeklyDeduction > 0){
          $scope.deductionType = 'biweekly';
          $scope.showBiweeklyDropdown = true;

          if(!$scope.obj.excellenceOnePctFlag && !$scope.obj.excellenceTwoPctFlag){
            $scope.obj.otherAmount = true;
            $scope.biweeklyAmount = 'otherAmount';
          }
        } 
        //else {
        //  $scope.biweeklyAmount = 'reset';
        //}

        if($scope.obj.oneTimeDeduction > 0){
          $scope.deductionType = 'onetime';
        }

        if($scope.obj.oneTimeDeduction == 0 && $scope.obj.biweeklyDeduction == 0){
          if(!$scope.obj.excellenceOnePctFlag || !$scope.obj.excellenceTwoPctFlag){
            $scope.deductionType = 'reset';
          }
        }


        
        //Set the flag for other organizations to true if the organizationDonations array has a value.
        //$scope.otherOrgFlag = $scope.obj.organizationDonations.length > 0 ? true:false;

        if(_.isUndefined($scope.obj.otherOrganization)){
          $scope.obj.otherOrganization = false;
        }
        
        $scope.otherOrgFlag = $scope.obj.otherOrganization;

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

            $scope.validatePercentages();

        } 

        $scope.calculateTotalAnnualDonation();


        //$scope.obj.eid = $scope.eid;
        $scope.obj.eid = $scope.employeeID;

        if(!_.isNull($scope.obj.email)){
          $scope.unitedway_form.email.$valid = true;
        }

        if($scope.donationAmount > 1000){
          $scope.leadershipCircleFlag = true;
        }


    }, function(error){

        $location.path("/error");

    });

    $scope.setFastTrackDonation = function(){

      if(!$scope.fastTrackFlag){
        $scope.ftDonationAmount = null;
        return false;
      }

      var plans = [
      {
        'name': 'cornerstone',
        'value': 500
      },
      {
        'name': 'pillar',
        'value': 1000
      },
      {
        'name': 'pioneer',
        'value': 2500
      },
      {
        'name': 'tocqueville',
        'value': 5000
      }
      ];

      $scope.ftDonationAmount = _.find(plans, function(plan){
        return plan.name == $scope.fastTrackPlanType;
      })
    }

    //Use both one time and biweekly values to calculate the total donation amount.

    $scope.calculateTotalAnnualDonation = function(){

        //Making sure a value is defined.
        if(_.isNull($scope.obj.oneTimeDeduction) || $scope.obj.oneTimeDeduction == undefined){
          $scope.obj.oneTimeDeduction = 0;
        }

        if(_.isNull($scope.obj.biweeklyDeduction) || $scope.obj.biweeklyDeduction == undefined){
          $scope.obj.biweeklyDeduction = 0;
        }


        $scope.obj.oneTimeDeduction = $scope.obj.oneTimeDeduction == '' ? 0 : $scope.obj.oneTimeDeduction;
        $scope.obj.biweeklyDeduction = $scope.obj.biweeklyDeduction == '' ? 0 : $scope.obj.biweeklyDeduction;

        //if($scope.fastTrackFlag){
        $scope.setFastTrackDonation();
        //}
        
        $scope.fastTrackAmount = $scope.ftDonationAmount ? $scope.ftDonationAmount.value : 0;


        $scope.donationAmount = parseFloat($scope.obj.oneTimeDeduction) + parseFloat($scope.obj.spouseAmt) + (parseFloat($scope.obj.biweeklyDeduction) * 26) + parseFloat($scope.fastTrackAmount);

    }

    $scope.setFastTrack = function(){
      $scope.changeFastTrack();

      if($scope.fastTrackFlag){
        $scope.resetDeduction();
        $scope.deductionType = 'reset';
        $scope.showBiweeklyDropdown = false;
      }
    }


    $scope.changeFastTrack = function(){
      if(!$scope.fastTrackPlanFlag){
        $scope.fastTrackPlanType = '';
        $scope.fastTrackFlag = false;
        $scope.fastTrackAmount = 0;
        $scope.calculateTotalAnnualDonation();
      } else {
        $scope.fastTrackFlag = true;
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

    }

    $scope.validateDeduction = function(){

      $scope.validateDeductionType();

      $scope.calculateTotalAnnualDonation();

      if($scope.donationAmount < 1000){
        $scope.leadershipCircleFlag = 0;
      }

    }

    $scope.resetDeduction = function(){
        $scope.obj.biweeklyDeduction = 0;
        $scope.obj.oneTimeDeduction = 0;
        //$scope.obj.biweeklyDeductionDescription = null;
        $scope.obj.oneTimeDeductionDescription = null;
        $scope.leadershipCircleFlag = false;
        $scope.biweeklyAmount = 'reset';
        $scope.showBiweeklyDropdown = $scope.deductionType == 'biweekly' ? true : false;
        $scope.obj.excellenceOnePctFlag = false;
        $scope.obj.excellenceTwoPctFlag = false;

        $scope.calculateTotalAnnualDonation();
    }


    $scope.resetBiWeeklyAmount = function(){
      //if($scope.deductionType == 'biweekly'){
        if($scope.biweeklyAmount == "otherAmount"){
          $scope.obj.excellenceOnePctFlag = false;
          $scope.obj.excellenceTwoPctFlag = false;
        }

        $scope.obj.biweeklyDeduction = 0;
        $scope.calculateTotalAnnualDonation();
      //}
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


      //Check the donation amount and make sure there's a value entered if the percentages have values as well.
      if($scope.otherOrgFlag || $scope.communityPlanFlag){
        
        if(_.isNull($scope.donationAmount) || $scope.donationAmount === 0){
          $scope.noAmountFlag = true;
          $scope.unitedway_form.donationTest.$setValidity("noAmount", false);
        }
      }







      //Calculate amount and create object to display on thank you page.
      var amount;

      $scope.setDonationFrequency();

      $scope.obj.fastTrackPlan = $scope.fastTrackPlanType;
      $scope.obj.deductiontype = $scope.deductionType;


      $scope.obj.otherOrganization = $scope.otherOrgFlag;
      $scope.obj.communityPlan = $scope.communityPlanFlag;


      if(!$scope.biweeklyAmount == 'one-percent' || !$scope.biweeklyAmount == 'two-percent'){
        amount = (parseFloat($scope.obj.biweeklyDeduction) * 26) + parseFloat($scope.obj.oneTimeDeduction);
      } else {
        amount = $scope.biweeklyAmount == 'one-percent' ? '1% of your salary' : '2% of your salary';
      }

      var donation = {
        'donor': $scope.employee.firstName + ' ' + $scope.employee.lastName,
        'amount': amount,
        'frequency': $scope.donationFrequency,
        'otherOrg': $scope.obj.otherOrganization
      };

      if($scope.biweeklyAmount == "one-percent"){
        $scope.obj.excellenceOnePctFlag = true;
        $scope.obj.excellenceTwoPctFlag = false;
        $scope.obj.biweeklyDeduction = 0;
        $scope.obj.oneTimeDeduction = 0;
      }

      if($scope.biweeklyAmount == "two-percent"){
        $scope.obj.excellenceTwoPctFlag = true;
        $scope.obj.excellenceOnePctFlag = false;
        $scope.obj.biweeklyDeduction = 0;
        $scope.obj.oneTimeDeduction = 0;
      }


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

      if($scope.biweeklyAmount == 'one-percent'){
        $scope.deductionType = 'biweekly';
        $scope.donationFrequency = "contribution of 1% of your salary is";
      }

      if($scope.biweeklyAmount == 'two-percent'){
        $scope.deductionType = 'biweekly';
        $scope.donationFrequency = "contribution of 2% of your salary is";
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

      //if($scope.orgTotal > 0){
        $scope.validatePercentages();
      //}
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

      if ($scope.orgTotal == 0) {
        $scope.orgValidity = true;
      }

      if($scope.communityPlanFlag && $scope.total == 0){
        $scope.orgValidity = false;
      }

      if($scope.orgTotal > 0 && $scope.orgTotal != 100){
        $scope.orgValidity = false;
      }

      if($scope.orgTotal == 100){
        $scope.orgValidity = true;
      }

      if($scope.otherOrgFlag || $scope.communityPlanFlag){
        //If either flag is set to true, then check the donation amount.
        if(_.isNull($scope.donationAmount) || $scope.donationAmount === 0){

          //If there is no donation amount specified, make sure it's not because
          //they joined the excellence club.
          if($scope.biweeklyAmount != "one-percent" && $scope.biweeklyAmount != "two-percent"){

            //If they haven't joined the excellence club, then set the form to be invalid.
            $scope.unitedway_form.donationTest.$setValidity("noAmount", false);
          }
        }
      } else {
        //If neither flag is checked, then the form is valid even if there's no donation.
          $scope.unitedway_form.donationTest.$setValidity("noAmount", true);
      }

      $scope.unitedway_form.orgPercentages.$setValidity("percentages", $scope.orgValidity);
  }

  $scope.percentageTotal = function(){

      //Ensuring default values for the inputs.
      var communityPercent = $scope.obj.communityPlanPercentage == '' ? 0 : $scope.obj.communityPlanPercentage;
      var educationPercent = $scope.obj.educationPercentage == '' ? 0 : $scope.obj.educationPercentage;
      var financialStabilityPercent = $scope.obj.financialStabilityPercentage == '' ? 0 : $scope.obj.financialStabilityPercentage;
      var healthPercent = $scope.obj.healthPercentage == '' ? 0 : $scope.obj.healthPercentage;

      $scope.total = parseInt(communityPercent) + parseInt(educationPercent) + parseInt(financialStabilityPercent) + parseInt(healthPercent);

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
