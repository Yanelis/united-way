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
fastTrackInfoFlag,
city,
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
C_REM,
willAndEstateFlag,
willAndEstateInfoFlag,
pledgeDate,
C_EST,
C_CUSTOM,
Business_name2,
Phone_area,
C_DISP,
State,
additionalAgencyFlag,
pledgeTime,
excellenceOnePctFlag,
excellenceTwoPctFlag,
familyGiftFlag,
C_COMP
)
select
replace(RIGHT('00000000'+eid,8),'e','0') as eid,
email,
replace(replace(str(biweekly_deduction,8,2),' ','0'),'.','') as fein,
replace(replace(str(one_time_deduction,8,2),' ','0'),'.','') as business_name,
case when one_time_deduction_description = 'Payroll' then 'Y' else ' ' end as onetimeDedGift,
case when one_time_deduction_description = 'Cash' then 'Y' else ' ' end as onetimeCashGift,
case when one_time_deduction_description = 'Check' then 'Y' else ' ' end as onetimeCheckGift,
case when one_time_deduction_description = 'Credit' then 'Y' else ' ' end as creditGiftFlag,
case when one_time_deduction_description = 'Credit' then 'Y' else ' ' end as debitGiftFlag,
case when fast_track_plan = 'cornerstone' then 'Y'
when fast_track_plan = 'pillar' then 'Y'
when fast_track_plan = 'pioneer' then 'Y'
when fast_track_plan = 'tocqueville' then 'Y' else ' ' end as fastTrackInfoFlag,
case when fast_track_plan = 'cornerstone' then 'Y'
when fast_track_plan = 'pillar' then 'Y'
when fast_track_plan = 'pioneer' then 'Y'
when fast_track_plan = 'tocqueville' then 'Y' else ' ' end as city,
spouse as phone_ext,
spouse_employer as rfpyear,
replace(replace(str(spouse_amt,9,2),' ','0'),'.','') as extattr,
case when fast_track_plan = 'cornerstone' then 'Y' else ' ' end as cornerstoneGiftFlag,
case when fast_track_plan = 'pillar' then 'Y' else ' ' end as pillarGiftFlag,
case when fast_track_plan = 'pioneer' then 'Y' else ' ' end as pioneerGiftFlag,
case when fast_track_plan = 'tocqueville' then 'Y' else ' ' end as toquevilleGiftFlag,
case when community_plan = 1 then 'Y' else ' ' end as fax_area,
replace(str(community_plan_percentage,3,0),' ','0') as phone_number,
replace(str(education_percentage,3,0),' ','0') as c_var,
replace(str(financial_stability_percentage,3,0),' ','0') as c_attr,
replace(str(health_percentage,3,0),' ','0') as c_value,
case when education_percentage > 0 then 'Y'
when financial_stability_percentage > 0 then 'Y'
when health_percentage > 0 then 'Y'
else ' '
end as crim,
case when will_and_estate = 1 then 'Y' else ' ' end as willAndEstateFlag,
case when will_and_estate_info = 1 then 'Y' else ' ' end as toquevilleGiftFlag,
convert(varchar,created,112) as pledgeDate,
(
select b.organization from united_way_organization b
where 1=1
and id = (select max(c.id) from united_way_organization c where c.donation_id =a.id)
) as c_est,
(
select replace(str(b.percentage,3,0),' ','0') from united_way_organization b
where 1=1
and id = (select max(c.id) from united_way_organization c where c.donation_id =a.id)
) as c_custom,
(
select b.organization from united_way_organization b
where 1=1
and id = (select avg(c.id) from united_way_organization c where c.donation_id =a.id)
) as business_name2,
(
select replace(str(b.percentage,3,0),' ','0') from united_way_organization b
where 1=1
and id = (select avg(c.id) from united_way_organization c where c.donation_id =a.id)
) as phone_area,
(
select b.organization from united_way_organization b
where 1=1
and id = (select min(c.id) from united_way_organization c where c.donation_id =a.id)
) as c_disp,
(
select replace(str(b.percentage,3,0),' ','0') from united_way_organization b
where 1=1
and id = (select min(c.id) from united_way_organization c where c.donation_id =a.id)
) as state,
case when additional_agency = 1 then 'Y' else '' end as additional_agency,
'000000' as time,
case when excellence_one_pct_flag = 1 then 'Y' else '' end as onepercentflag,
case when excellence_two_pct_flag = 1 then 'Y' else '' end as twopercentflag,
case when spouse <> null then 'Y' when spouse <> '' then 'Y' else '' end as familyflag,
case when other_organization = 1 then 'Y' else '' end as c_comp
FROM dbo.united_way_donation a