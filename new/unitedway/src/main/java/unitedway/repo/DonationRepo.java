package unitedway.repo;

import org.springframework.data.repository.CrudRepository;

import unitedway.models.Donation;

/**
 * Created by david492000 on 6/9/15.
 */
public interface DonationRepo extends CrudRepository<Donation,Long> {
}
