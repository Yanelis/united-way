package unitedway.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by david492000 on 7/6/15.
 */
@Entity
public class UnitedWayOrganization implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;



    @ManyToOne(optional = false)
    @JsonBackReference
    private UnitedWayDonation donation;

    @Column(nullable = false)
    private String organization;

    @Column(nullable = false)
    private double percentage;


    public UnitedWayOrganization(String organization, double percentage) {
        this.organization = organization;
        this.percentage = percentage;
    }

    public UnitedWayOrganization() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UnitedWayDonation getDonation() {
        return donation;
    }

    public void setDonation(UnitedWayDonation donation) {
        this.donation = donation;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }


}
