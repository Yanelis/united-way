package unitedway.bootstrap;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unitedway.models.UnitedWayDonation;
import unitedway.models.UnitedWayOrganization;
import unitedway.repo.DonationRepo;
import unitedway.repo.OrganizationRepo;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by david492000 on 6/9/15.
 */
@Service
public class Bootstrap implements InitializingBean {

    @Autowired
    OrganizationRepo organizations;

    @Autowired
    DonationRepo donations;

    @Override
    public void afterPropertiesSet() throws Exception{

        /*Set<UnitedWayOrganization> orglist = new HashSet<UnitedWayOrganization>();

        UnitedWayDonation saved;
        UnitedWayDonation unitedWayDonation = new UnitedWayDonation();
        unitedWayDonation.setEid("123456");
        unitedWayDonation.setEmail("david492000@yahoo.com");
        unitedWayDonation.setCreated(new Date());
        saved = donations.save(unitedWayDonation);

        UnitedWayOrganization org = null;
        for(int a = 0; a < 3; a++){
            org = new UnitedWayOrganization("hello" + a, 11);
           org.setDonation(saved);
            organizations.save(org);
            orglist.add(org);
        }

        saved = donations.findOne(saved.getId());


        */

    }
}
