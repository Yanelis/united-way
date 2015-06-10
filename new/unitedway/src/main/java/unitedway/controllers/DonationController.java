package unitedway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unitedway.models.UnitedWayDonation;
import unitedway.repo.DonationRepo;

import javax.validation.Valid;

/**
 * Created by david492000 on 6/9/15.
 */
@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    DonationRepo repo;

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

        return repo.save(donation);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<UnitedWayDonation> update(@PathVariable Long id,
                                                    @RequestBody @Valid UnitedWayDonation donation){

        UnitedWayDonation exist = repo.findOne(donation.getId());
        if(exist == null)
            return new ResponseEntity<UnitedWayDonation>(donation, HttpStatus.BAD_REQUEST);

        UnitedWayDonation updated = repo.save(donation);
        return new ResponseEntity<UnitedWayDonation>(updated, HttpStatus.OK);
    }

}
