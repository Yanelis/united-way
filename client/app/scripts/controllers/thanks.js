'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ThanksCtrl', ['$scope', 'pledge', 'portalService', '$http', 'endpoints', function ($scope, pledge, portalService, $http, endpoints) {
    //$scope.obj = {};
    $scope.fasttrackenroll = "N";
    
    $scope.eid = portalService.getUserId();

    if ($scope.eid.indexOf('e') > -1){
      $scope.employeeID = $scope.eid.substring(1, $scope.eid.length);
    } else {
      $scope.employeeID = $scope.eid;
    }



    var employee = $http.get(endpoints.pledgeUrl + '/employee/' + $scope.employeeID + '/info');
    
    employee.then(function(data){

      $scope.employee = pledge.new_employee(data.data);

    });

    var promise = $http.get(endpoints.pledgeUrl + '/employee/' + $scope.eid);
    promise.then(function(data){

        //console.log(data);
        $scope.obj = pledge.new_pledge(data.data[0]);


    }, function(error){
        $scope.obj = pledge.new_pledge(null);
        $scope.calculateTotalAnnualDonation();

    });


    $scope.calculateTotalAnnualDonation = function(){
      if($scope.donationFrequency == 'biweekly'){
        $scope.obj.donationAmount = $scope.obj.biweeklyDeduction * 26;
      } 

      if($scope.donationFrequency == 'onetime'){
        $scope.obj.donationAmount = $scope.obj.oneTimeDeduction;
      }

      if($scope.donationFrequency == 'reset'){
        $scope.obj.donationAmount = 0;
      }
    }

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


    $scope.addOrganization = function(){
      var newOrg = pledge.new_organization(null);
      $scope.obj.organizationDonations.push(newOrg);
      return newOrg;
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
