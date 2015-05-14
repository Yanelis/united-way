package gov.miamidade.content;

import java.util.Date;
import java.util.List;

import mjson.Json;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ContentRepository {

		@Autowired
		JdbcTemplate jdbcTemplate;
		
		public List<Json> getPressReleases(String year, String month) {
				List<Json> result = jdbcTemplate.query(
				"select * from iw_press_release where release_year = ? and release_month = ? ", 
				new Object[]{year, month},
				new PressReleaseToJsonMapper());
				return result;
		}
	
		public List<Json> getBlogPosts(int limit, int offset){
			List<Json> result = jdbcTemplate.query(
			pagingMSSQL("select * from blogData", "postDate", limit, offset), 
			new BlogToJsonMapper());
			return result;
		}	
		
		public List<Json> getBlogPosts(Date from, Date to){
				List<Json> result = jdbcTemplate.query(
				"select * from blogData where postDate BETWEEN ?  AND ? order by postDate DESC", 
				new Object[]{from, to},
				new BlogToJsonMapper());
				return result;
		}
		
		public List<Json> getBlogPostsByCategory(String category, int limit, int offset){
				List<Json> result = jdbcTemplate.query(
				pagingMSSQL("select * from blogData where category LIKE ?","postDate", limit, offset), 
				new Object[]{"%" + category + "%"},
				new BlogToJsonMapper());
				return result;
		}
		
		public List<Json> getBlogCategories(){
				List<Json> result = jdbcTemplate.query(
				"select  distinct category, subCategory from blogData order by category", 
				new BlogCategoryToJsonMapper());
				return result;
		}
		
		private static String pagingMSSQL(String originalSQL, String orderByColumn, int limit, int offset ){
			String result = "SELECT * FROM ( "
					 + " SELECT ROW_NUMBER() OVER( ORDER BY B."+ orderByColumn +" DESC) AS ROW, * FROM"
		             + " (" + originalSQL + " ) AS B"
		             + " ) AS A"
		             + " WHERE ROW BETWEEN " + offset +" AND " + (offset +limit - 1); 
			return result;
		}
}
