package unitedway.repo;

import org.springframework.data.repository.CrudRepository;

import unitedway.models.UnitedWayDonation;

import java.util.List;

/**
 * Created by david492000 on 6/9/15.
 */
public interface DonationRepo extends CrudRepository<UnitedWayDonation,Long> {

    List<UnitedWayDonation> findByEidOrderByCreatedDesc(String eid);
}
