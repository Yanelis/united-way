package unitedway.controllers;


import mjson.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import unitedway.models.UnitedWayDonation;
import unitedway.repo.DonationRepo;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by david492000 on 6/9/15.
 */
@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    DonationRepo repo;

    @Autowired
    JdbcTemplate template;

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


        donation.setCreated(new Date());
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



    @RequestMapping("/employee/{eid}")
    public List<UnitedWayDonation> getByEId(@PathVariable String eid){


        return repo.findByEidOrderByCreatedDesc(eid);
    }

    @RequestMapping("/employee/{eid}/info")
    public ResponseEntity<String> getEmployeeInfo(@PathVariable String eid){

        //apend 0s
        for(int i = eid.length(); i < 8; i++)
            eid = "0"+eid;



        Json json = Json.object();
        ColumnMapRowMapper rowMapper = new ColumnMapRowMapper();
        List<Map<String, Object>> rows = template.query("select firstName, lastName, Department from dbo.united_way_original_data where EntityID = ?", rowMapper, eid);

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        if(!rows.isEmpty() && rows !=  null) {
            Map<String, Object> row = rows.get(0);

            for (Map.Entry<String, Object> entry : row.entrySet()) {

                json.set(entry.getKey(), entry.getValue());

            }
        }


        return new ResponseEntity<String>(json.toString(), HttpStatus.OK);
    }






}


