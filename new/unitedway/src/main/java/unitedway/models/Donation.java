package unitedway.models;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by david492000 on 6/9/15.
 */


@Entity
public class Donation implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String eid;

    @Column(nullable = true)
    private String email;

    public Donation() {}

    public Long getId() {
        return id;
    }

    /*public void setId(Long id) {
        this.id = id;
    }*/

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
