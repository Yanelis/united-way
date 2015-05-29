package gov.miamidade.content;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import mjson.Json;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * 
 * @author SABBAS
 *
 */
@Path("/pressreleases")
public class PressReleaseEndpoint {

	@Autowired
	private ContentRepository contentRepository;
	
	
	
	@GET
	@Path("/{year}/{month}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPressReleases(@PathParam("year") String year,
								   @PathParam("month") String month,
								   @QueryParam("limit") String limit) {
		try {
			List<Json> pressReleases = contentRepository.getPressReleases(year,month);
			Json result = Json.make(pressReleases);
			return Response.ok(result, MediaType.APPLICATION_JSON)
					//should probably add a filter for CORS headers.
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
					.header("Access-Control-Max-Age", "3600")
					.header("Access-Control-Allow-Headers", "x-requested-with")
					.build();
		} catch (Exception e) {
			return Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.type(MediaType.APPLICATION_JSON)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
					.header("Access-Control-Max-Age", "3600")
					.header("Access-Control-Allow-Headers", "x-requested-with")
					.entity(Json.object().set("error", e.getClass().getName())
							.set("message", e.getMessage())).build();
		}
	}

}
