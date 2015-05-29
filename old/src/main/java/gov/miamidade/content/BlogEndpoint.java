package gov.miamidade.content;

import java.text.SimpleDateFormat;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
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
@Path("/blogs")
public class BlogEndpoint {
	@Autowired
	private ContentRepository contentRepository;
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBlogPosts(@QueryParam("from") String from,
								 @QueryParam("to") String to,
								 @QueryParam("category") String category,
								 @QueryParam("subCategory") String subCategory,
								 @QueryParam("limit") int limit,
								 @QueryParam("offset") int offset) {
		
		try {
			List<Json> blogPosts = null;
			if (limit <= 0)
			{
				limit = Integer.MAX_VALUE;
			}
			if (offset < 0)
			{
				offset = 0;
			}
			if (from != null && to != null)
			{
				SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
				blogPosts = contentRepository.getBlogPosts(dateFormat.parse(from), dateFormat.parse(to));
			} else if (category != null)
			{
				blogPosts = contentRepository.getBlogPostsByCategory(category, limit, offset);
			} else
			{
				blogPosts = contentRepository.getBlogPosts(limit, offset);
			}
			
			Json result = Json.make(blogPosts);
			return Response.ok(result, MediaType.APPLICATION_JSON)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
					.header("Access-Control-Max-Age", "3600")
					.header("Access-Control-Allow-Headers", "x-requested-with").build();
		} catch (Exception e) {
			return Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.type(MediaType.APPLICATION_JSON)
					.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
					.header("Access-Control-Max-Age", "3600")
					.header("Access-Control-Allow-Headers", "x-requested-with")
					.entity(Json.object().set("error", e.getClass().getName())
							.set("message", e.getMessage())).build();
		}
	}
	
	@GET
	@Path("/categories")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBlogCategories() {
		try {
			List<Json> blogCategories = contentRepository.getBlogCategories();
			Json result = Json.make(blogCategories);
			return Response.ok(result, MediaType.APPLICATION_JSON)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
					.header("Access-Control-Max-Age", "3600")
					.header("Access-Control-Allow-Headers", "x-requested-with").build();
		} catch (Exception e) {
			return Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
					.header("Access-Control-Max-Age", "3600")
					.header("Access-Control-Allow-Headers", "x-requested-with")
					.type(MediaType.APPLICATION_JSON)
					.entity(Json.object().set("error", e.getClass().getName())
							.set("message", e.getMessage())).build();
		}
	}
	
	

}
