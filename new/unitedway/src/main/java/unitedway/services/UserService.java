package unitedway.services;

import mjson.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by david492000 on 10/9/15.
 */
@Component
public class UserService {

    @Autowired
    @Qualifier("secondaryTemplate")
    JdbcTemplate template;




    public Json getEmployeeInfo(String eid){
        //drop the e
        eid = eid.replace("e","");
        //apend 0s
        //for(int i = eid.length(); i < 8; i++)
        //    eid = "0"+eid;



        Json json = Json.object();
        ColumnMapRowMapper rowMapper = new ColumnMapRowMapper();
        List<Map<String, Object>> rows = template.query("select Fname as firstName, Lname as lastName, DEPARTMENT as Department, WK_email as email from dbo.UserList where UserID = ?", rowMapper, eid);

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        if(!rows.isEmpty() && rows !=  null) {
            Map<String, Object> row = rows.get(0);

            for (Map.Entry<String, Object> entry : row.entrySet()) {

                json.set(entry.getKey(), entry.getValue());

            }
        }

        return json;
    }
}
