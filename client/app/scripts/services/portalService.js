/**
 * Created by david492000 on 8/18/15.
 */

angular.module('clientApp').factory('portalService', function(){

  function getUserId(){
    //return miamidade.user.PortalUser.uid
    return "300670";
  }


  return{
    getUserId: getUserId
  }

})
