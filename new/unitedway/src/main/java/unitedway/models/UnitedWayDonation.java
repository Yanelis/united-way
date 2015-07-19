package unitedway.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;


/**
 * Created by david492000 on 6/9/15.
 */


@Entity
@Table(indexes = {@Index(name="eid",columnList = "eid", unique = false)})
public class UnitedWayDonation implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;


    @Column(nullable = false)
    private String eid;

   @JsonManagedReference
   @OneToMany(mappedBy = "donation", fetch=FetchType.EAGER, cascade = {CascadeType.PERSIST})
    private Set<UnitedWayOrganization> organizationDonations;

    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private Double biweeklyDeduction;

    @Column(nullable = true)
    private Double oneTimeDeduction;

    @Column(nullable = true)
    private String deductionType;



    @Column(nullable = true)
    private String spouse;

    @Column(nullable = true)
    private String spouseEmployer;

    @Column(nullable = true)
    private double spouseAmt;

    @Column(nullable = true)
    private String fastTrackPlan;

    @Column(nullable = true)
    private boolean communityPlan;

    @Column(nullable = true)
    private double communityPlanPercentage;
    @Column(nullable = true)
    private double educationPercentage;

    @Column(nullable = true)
    private double financialStabilityPercentage;

    @Column(nullable = true)
    private double healthPercentage;

    @Column(nullable = true)
    private boolean specificAgencyPlan;


    @Column(nullable = false)
    private Date created;

    @Column(nullable = true)
    private Date updated;



    public UnitedWayDonation() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Double getBiweeklyDeduction() {
        return biweeklyDeduction;
    }

    public void setBiweeklyDeduction(Double biweeklyDeduction) {
        this.biweeklyDeduction = biweeklyDeduction;
    }

    public Double getOneTimeDeduction() {
        return oneTimeDeduction;
    }

    public void setOneTimeDeduction(Double oneTimeDeduction) {
        this.oneTimeDeduction = oneTimeDeduction;
    }

    public String getDeductionType() {
        return deductionType;
    }

    public void setDeductionType(String deductionType) {
        this.deductionType = deductionType;
    }


    public String getSpouse() {
        return spouse;
    }

    public void setSpouse(String spouse) {
        this.spouse = spouse;
    }

    public String getSpouseEmployer() {
        return spouseEmployer;
    }

    public void setSpouseEmployer(String spouseEmployer) {
        this.spouseEmployer = spouseEmployer;
    }

    public double getSpouseAmt() {
        return spouseAmt;
    }

    public void setSpouseAmt(double spouseAmt) {
        this.spouseAmt = spouseAmt;
    }

    public boolean isCommunityPlan() {
        return communityPlan;
    }

    public void setCommunityPlan(boolean communityPlan) {
        this.communityPlan = communityPlan;
    }

    public double getCommunityPlanPercentage() {
        return communityPlanPercentage;
    }

    public void setCommunityPlanPercentage(double communityPlanPercentage) {
        this.communityPlanPercentage = communityPlanPercentage;
    }

    public double getEducationPercentage() {
        return educationPercentage;
    }

    public void setEducationPercentage(double educationPercentage) {
        this.educationPercentage = educationPercentage;
    }

    public double getFinancialStabilityPercentage() {
        return financialStabilityPercentage;
    }

    public void setFinancialStabilityPercentage(double financialStabilityPercentage) {
        this.financialStabilityPercentage = financialStabilityPercentage;
    }

    public double getHealthPercentage() {
        return healthPercentage;
    }

    public void setHealthPercentage(double healthPercentage) {
        this.healthPercentage = healthPercentage;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public String getFastTrackPlan() {
        return fastTrackPlan;
    }

    public void setFastTrackPlan(String fastTrackPlan) {
        this.fastTrackPlan = fastTrackPlan;
    }

    public Set<UnitedWayOrganization> getOrganizationDonations() {
        return organizationDonations;

    }

    public void setOrganizationDonations(Set<UnitedWayOrganization> organizationDonations) {
        this.organizationDonations = organizationDonations;
    }
   /* public void addUnitedWayOrganization(UnitedWayOrganization obj){
        if(organizationDonations == null)
            organizationDonations = new HashSet<UnitedWayOrganization>();

        organizationDonations.add(obj);
    }*/


}
