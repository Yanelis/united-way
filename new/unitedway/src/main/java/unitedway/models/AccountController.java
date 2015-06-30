package unitedway.models;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by david492000 on 6/30/15.
 */
@RestController
@RequestMapping("/accounts")
public class AccountController {


    @RequestMapping(value="/authenticate", method= RequestMethod.GET)
    public ResponseEntity<UnitedWayUser> authenticate(){

        UnitedWayUser user = new UnitedWayUser();
        user.setUserName("NA");

        return new ResponseEntity<UnitedWayUser>(user, HttpStatus.OK);
    }

}
