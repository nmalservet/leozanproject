--role definnitions
INSERT INTO role(id,name,description)values(1,'administrator','admin user can do all actions on the system');
INSERT INTO role(id,name,description)values(2,'manager','manager user can do all actions ');
INSERT INTO role(id,name,description)values(3,'guest','guest user');


--status select list
insert into select_list (id,name,description,label) values(1,'surveyStatus','statuses for a survey','status');
insert into select_list_option(id,name,label,display_order,key,select_list_id) values(1,'new','New',0,0,1);
insert into select_list_option(id,name,label,display_order,key,select_list_id) values(2,'validated','In progress',1,1,1);
insert into select_list_option(id,name,label,display_order,key,select_list_id) values(3,'deployed','Done',2,2,1);
insert into select_list_option(id,name,label,display_order,key,select_list_id) values(4,'disabled','Disabled',3,3,1);
