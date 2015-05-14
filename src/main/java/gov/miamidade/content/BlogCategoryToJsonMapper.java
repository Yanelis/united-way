package gov.miamidade.content;

import java.sql.ResultSet;
import java.sql.SQLException;

import mjson.Json;

import org.springframework.jdbc.core.RowMapper;

public class BlogCategoryToJsonMapper implements RowMapper<Json> {

	@Override
	public Json mapRow(ResultSet rs, int index) throws SQLException {
		Json blogPost = Json.object()
				.set("category", StringUtils.splitAndTrim(rs.getString("category")))
				.set("subCategory", rs.getString("subCategory"));
		return blogPost;
	}

}
