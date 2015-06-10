package unitedway.repo;

import org.springframework.data.repository.CrudRepository;

import unitedway.models.UnitedWayDonation;

/**
 * Created by david492000 on 6/9/15.
 */
public interface DonationRepo extends CrudRepository<UnitedWayDonation,Long> {
}
