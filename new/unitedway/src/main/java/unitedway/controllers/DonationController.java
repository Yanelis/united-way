package unitedway.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import unitedway.mail.UnitedWayMail;
import unitedway.models.UnitedWayDonation;
import unitedway.repo.DonationRepo;
import unitedway.services.UserService;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

/**
 * Created by david492000 on 6/9/15.
 */
@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    DonationRepo repo;



    @Autowired
    UnitedWayMail mail;

    @Autowired
    UserService userService;


    final String source = "ONLINE";

    @RequestMapping(method= RequestMethod.GET)
    public Iterable<UnitedWayDonation> index(){

        return repo.findAll();
    }

    @RequestMapping(value="/{id}",method= RequestMethod.GET)
    public UnitedWayDonation get(@PathVariable Long id){

        return repo.findOne(id);
    }

    @RequestMapping(method=RequestMethod.POST)
    public UnitedWayDonation create(@RequestBody @Valid UnitedWayDonation donation){


        try {

            Context context = mail.prepareContext(donation);
            String body = mail.processTemplate(context, "DonationTemplate");

            String jsonMessage = mail.buildMessage(donation.getEmail(), "noreply@miamidade.gov","United Way", body, "Thank You for Your United Way donation!");
            String response = mail.emailRequest(jsonMessage);

        }catch(Exception ex){
            System.out.println("email didn't go trough");
            ex.printStackTrace();
        }


        donation.setSource(source);
        donation.setCreated(new Date());
        return repo.save(donation);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<UnitedWayDonation> update(@PathVariable Long id,
                                                    @RequestBody @Valid UnitedWayDonation donation){

        UnitedWayDonation exist = repo.findOne(donation.getId());
        if(exist == null)
            return new ResponseEntity<UnitedWayDonation>(donation, HttpStatus.BAD_REQUEST);

        donation.setSource(source);
        UnitedWayDonation updated = repo.save(donation);
        return new ResponseEntity<UnitedWayDonation>(updated, HttpStatus.OK);
    }



    @RequestMapping("/employee/{eid}")
    public List<UnitedWayDonation> getByEId(@PathVariable String eid){


        return repo.findByEidOrderByCreatedDesc(eid);
    }

    @RequestMapping("/employee/{eid}/info")
    public ResponseEntity<String> getEmployeeInfo(@PathVariable String eid){


        return new ResponseEntity<String>(userService.getEmployeeInfo(eid).toString(), HttpStatus.OK);
    }



    @RequestMapping("/testemail")
    public ResponseEntity<String> testEmail(){


        UnitedWayDonation donation = new UnitedWayDonation();
        //donation.setEmail("SANCHOO@miamidade.gov");
        donation.setEmail("dawong@miamidade.gov");
        donation.setEid("199586");
        donation.setBiweeklyDeduction(1.00);
        //donation.setExcellenceOnePctFlag(true);
        //donation.setExcellenceTwoPctFlag(true);
        Context context = mail.prepareContext(donation);
        String body = mail.processTemplate(context, "DonationTemplate");
        String jsonMessage = mail.buildMessage(donation.getEmail(), "noreply@miamidade.gov","United Way", body, "Thank You for Your United Way donation!");

            String response = mail.emailRequest(jsonMessage);


        return new ResponseEntity<String>(response, HttpStatus.OK);
    }





}


