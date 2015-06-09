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

    @Column(nullable = true)
    private Double biweeklyDeduction;

    @Column(nullable = true)
    private Double oneTimeDeduction;

    @Column(nullable = true)
    private String deductionType;

    @Column(nullable = true)
    private int salaryPercentage;

    @Column(nullable = true)
    private String spouse;

    @Column(nullable = true)
    private String spouseEmployer;

    @Column(nullable = true)
    private double spouseAmt;

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

    public int getSalaryPercentage() {
        return salaryPercentage;
    }

    public void setSalaryPercentage(int salaryPercentage) {
        this.salaryPercentage = salaryPercentage;
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
}
