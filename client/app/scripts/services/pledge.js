function pledge_obj(json){
  this.id = null;
  this.eid = null;
  this.email = null;
  this.biweeklyDeduction = null;
  this.oneTimeDeduction = null;
  this.deductionType = null;

  this.spouse = null;
  this.spouseEmployer = null;
  this.spouseAmt = null;
  this.fastTrackPlan = null;
  this.communityPlan = null;
  this.communityPlanPercentage = null;
  this.educationPercentage = null;
  this.financialStabilityPercentage = null;
  this.healthPercentage = null;
  this.created = null;
  this.updated = null;

  if(_.isNull(json) || _.isUndefined(json)){

    this.id = json.id;
    this.eid = json.eid;
    this.email = json.email;
    this.biweeklyDeduction = json.biweeklyDeduction;
    this.oneTimeDeduction = json.oneTimeDeduction;
    this.deductionType = json.deductionType;

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

  var resource = $resource(endpoints.pledgeUrl, {id: "@_id"}, {"update":{method:'PUT'}});


  pledge_obj.prototype = {

    save:function(){
      var that = this;
      return resource.save(that).$promise;
    }

  }

  return {


  }
})
