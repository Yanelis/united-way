package unitedway.bootstrap;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unitedway.models.UnitedWayDonation;
import unitedway.repo.DonationRepo;

import java.util.Date;

/**
 * Created by david492000 on 6/9/15.
 */
@Service
public class Bootstrap implements InitializingBean {

    @Autowired
    DonationRepo donations;

    @Override
    public void afterPropertiesSet() throws Exception{


        UnitedWayDonation unitedWayDonation = new UnitedWayDonation();
        unitedWayDonation.setEid("123456");
        unitedWayDonation.setEmail("david492000@yahoo.com");
        unitedWayDonation.setCreated(new Date());
        donations.save(unitedWayDonation);
    }
}
