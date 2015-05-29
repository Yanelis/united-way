package gov.miamidade.content;

import java.sql.ResultSet;
import java.sql.SQLException;

import mjson.Json;

import org.springframework.jdbc.core.RowMapper;

public class BlogToJsonMapper implements RowMapper<Json> {

	@Override
	public Json mapRow(ResultSet rs, int index) throws SQLException {
		Json blogPost = Json.object()
				.set("title", rs.getString("title"))
				.set("pageLink", rs.getString("pageLink"))
				.set("imageLink", rs.getString("imageLink"))
				.set("shortDescription", rs.getString("shortDescription"))
				.set("category", StringUtils.splitAndTrim(rs.getString("category")))
				.set("subCategory", rs.getString("subCategory"))
				.set("postDate", rs.getString("postDate"))
				.set("imageAlt", rs.getString("imageAlt"))
				.set("hidePost", rs.getString("hidePost"))
				.set("webName", rs.getString("webName"));
		return blogPost;
	}
	
	

}
