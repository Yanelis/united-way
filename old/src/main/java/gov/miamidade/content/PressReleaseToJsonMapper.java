package gov.miamidade.content;

import java.sql.ResultSet;
import java.sql.SQLException;

import mjson.Json;

import org.springframework.jdbc.core.RowMapper;

public class PressReleaseToJsonMapper implements RowMapper<Json> {

	@Override
	public Json mapRow(ResultSet rs, int index) throws SQLException {
		Json pressRelease = Json.object()
				.set("path", rs.getString("path"))
				.set("web", rs.getString("WEB"))
				.set("issueDept", rs.getString("ISSUEDEPT"))
				.set("releaseMonth", rs.getString("RELEASE_MONTH"))
				.set("releaseDay", rs.getString("RELEASE_DAY"))
				.set("releaseYear", rs.getString("RELEASE_YEAR"));
		return pressRelease;
	}

}
