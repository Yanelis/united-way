INSERT INTO united_way_original_data
(
EntityID,
Email_Address,
FEIN,
Business_Name,
onetimeDedGiftFlag,
onetimeCashGiftFlag,
onetimeCheckGiftFlag,
creditGiftFlag,
debitGiftFlag,
Phone_ext,
RFPYear,
ExtAttr,
cornerstoneGiftFlag,
pillarGiftFlag,
pioneerGiftFlag,
toquevilleGiftFlag,
Fax_area,
Phone_number,
C_VAR,
C_ATTR,
C_VALUE,
willAndEstateFlag,
willAndEstateInfoFlag,
pledgeDate
)
select
eid,a
email,
biweekly_deduction,
one_time_deduction,
biweekly_deduction_description,
'',
'',
'',
'',
'',
spouse,
spouse_employer,
spouse_amt,
'',
'',
'',
community_plan,
community_plan_percentage,
education_percentage,
financial_stability_percentage,
health_percentage,
will_and_estate,
will_and_estate_info,
created
FROM dbo.united_way_donation



