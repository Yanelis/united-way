delete from united_way_organization;


insert into united_way_organization
(organization
,donation_id
,percentage
)
select a.c_est
,b.id
,cast(SUBSTRING(a.C_CUSTOM, 0,6)+'.'+ SUBSTRING(a.C_CUSTOM, 6,2) as decimal(7,2)) as per
from united_way_donation b,
united_way_original_data a
where 1=1
and REPLACE(LTRIM(REPLACE(a.EntityID, '0', ' ')), ' ', '0') = b.eid
and b.id = (select max(c.id) from united_way_donation c where c.eid = b.eid)
and a.c_est <> '';





insert into united_way_organization
(organization
,donation_id
,percentage
)
select a.Business_name2
,b.id
,cast(SUBSTRING(a.Phone_area, 0,6)+'.'+ SUBSTRING(a.Phone_area, 6,2) as decimal(7,2)) as per
from united_way_donation b,
united_way_original_data a
where 1=1
and REPLACE(LTRIM(REPLACE(a.EntityID, '0', ' ')), ' ', '0') = b.eid
and b.id = (select max(c.id) from united_way_donation c where c.eid = b.eid)
and a.Business_name2 <> '';


insert into united_way_organization
(organization
,donation_id
,percentage
)
select a.C_DISP
,b.id
,cast(SUBSTRING(a.State, 0,6)+'.'+ SUBSTRING(a.State, 6,2) as decimal(7,2)) as per
from united_way_donation b,
united_way_original_data a
where 1=1
and REPLACE(LTRIM(REPLACE(a.EntityID, '0', ' ')), ' ', '0') = b.eid
and b.id = (select max(c.id) from united_way_donation c where c.eid = b.eid)
and a.C_DISP <> '';


select count(id) from united_way_organization;