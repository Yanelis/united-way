package unitedway;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;


/**
 * Created by david492000 on 11/2/15.
 */
@Configuration
public class JdbcTemplates {


    @Bean(name="secondaryTemplate")
    public JdbcTemplate secondaryTemplate(@Qualifier("secondaryDataSource")DataSource ds){
        return new JdbcTemplate(ds);
    }
}
