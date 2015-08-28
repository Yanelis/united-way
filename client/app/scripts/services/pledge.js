
function unitedWayOrganization(json){
  this.id = null;
  this.organization = null;
  this.percentage = 0;

  if(!_.isNull(json) && !_.isUndefined(json)){

    this.id = json.id;
    this.organization = json.organization;
    this.percentage = json.percentage;
  }
}

function employee_obj(json){
  this.firstName = null;
  this.lastName = null;
  this.department = null;

  if(!_.isNull(json) && !_.isUndefined(json)){
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.department = json.Department;

  }
}

function pledge_obj(json){
  this.id = null;
  this.eid = null;
  this.organizationDonations = [];
  this.email = null;
  this.biweeklyDeduction = 0;
  this.oneTimeDeduction = 0;
  this.deductionType = null;


  this.ename = null;
  this.eLastName = null;
  this.eDept = null;
  this.additionalAgency = false;
  this.willAndEstate = false;
  this.willAndEstateInfo = false;
  this.loyalContributor = false;


  this.spouse = null;
  this.spouseEmployer = null;
  this.spouseAmt = 0;
  this.fastTrackPlan = null;
  this.communityPlan = null;
  this.communityPlanPercentage = 0;
  this.educationPercentage = 0;
  this.financialStabilityPercentage = 0;
  this.healthPercentage = 0;
  this.created = null;
  this.updated = null;


  if(!_.isNull(json) && !_.isUndefined(json)){

    console.log(json);
    this.id = json.id;
    this.eid = json.eid;
    this.organizationDonations = json.organizationDonations;

    this.email = json.email;
    this.biweeklyDeduction = json.biweeklyDeduction;
    this.oneTimeDeduction = json.oneTimeDeduction;
    this.deductionType = json.deductionType;

    this.ename = json.ename;
    this.eLastName = json.eLastName;
    this.eDept = json.eDept;
    this.additionalAgency = json.additionalAgency;
    this.willAndEstate = json.willAndEstate;
    this.willAndEstateInfo = json.willAndEstateInfo;
    this.loyalContributor = json.loyalContributor;

    this.spouse = json.spouse;
    this.spouseEmployer = json.spouseEmployer;
    this.spouseAmt = json.spouseAmt;
    this.fastTrackPlan = json.fastTrackPlan;
    this.communityPlan = json.communityPlan;
    this.communityPlanPercentage = json.communityPlanPercentage;
    this.educationPercentage = json.educationPercentage;
    this.financialStabilityPercentage = json.financialStabilityPercentage;
    this.healthPercentage = json.healthPercentage;
    this.created = json.created;
    this.updated = json.updated;

  }
}
/**
 * Created by david492000 on 6/22/15.
 */
angular.module('clientApp').factory('pledge', function($resource, endpoints){

  function new_pledge(json){
    return new pledge_obj(json);
  }

  function new_organization(json){
    return new unitedWayOrganization(json);
  }

  function new_employee(json){
    return new employee_obj(json);
  }


  var resource = $resource(endpoints.pledgeUrl, {id: "@_id"}, {"update":{method:'PUT'}});
  console.log("url " + endpoints.pledgeUrl);


  pledge_obj.prototype = {

    save:function(){
      var that = this;
      return resource.save(that).$promise;
    }

  }

  return {
    new_pledge : new_pledge,
    new_organization: new_organization,
    new_employee: new_employee
  }
})
