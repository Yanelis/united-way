package unitedway.repo;

import org.springframework.data.repository.CrudRepository;
import unitedway.models.UnitedWayOrganization;

/**
 * Created by david492000 on 7/6/15.
 */
public interface OrganizationRepo extends CrudRepository<UnitedWayOrganization, Long> {
}
