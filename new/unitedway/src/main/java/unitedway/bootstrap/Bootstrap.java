package unitedway.bootstrap;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unitedway.models.Donation;
import unitedway.repo.DonationRepo;

/**
 * Created by david492000 on 6/9/15.
 */
@Service
public class Bootstrap implements InitializingBean {

    @Autowired
    DonationRepo donations;

    @Override
    public void afterPropertiesSet() throws Exception{
        Donation donation = new Donation();
        donation.setEid("123456");
        donation.setEmail("david492000@yahoo.com");
        donations.save(donation);
    }
}
