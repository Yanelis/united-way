package unitedway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unitedway.models.Donation;
import unitedway.repo.DonationRepo;

import java.util.List;

/**
 * Created by david492000 on 6/9/15.
 */
@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    DonationRepo repo;

    @RequestMapping(method= RequestMethod.GET)
    public Iterable<Donation> index(){

        return repo.findAll();
    }
}
