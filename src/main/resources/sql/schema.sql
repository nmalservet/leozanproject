
 
 create table project(
  id SERIAL PRIMARY KEY,
  name varchar(250),
  description text,
  status int default 0,
  disabled boolean default false
 );
 
 --
   CREATE TABLE role(
  id int PRIMARY KEY,
  name varchar(50),
  description varchar(300),
  ldap_dn varchar(500)
 );
 
 CREATE TABLE feature(
  id int PRIMARY KEY,
  name varchar(50),
  description varchar(300)
 );
 
 CREATE TABLE role_authorization(
  id int PRIMARY KEY,
  role_id int,
  feature_id int
 );
 
 --manage session from users internal or external
  CREATE TABLE user_session(
 id serial PRIMARY KEY,
 internal_user_id int,
 login varchar(10),
 token varchar(200) unique,
 creation_date timestamp,
 last_activity timestamp
 );

--user is a reserved word in postgres
CREATE TABLE user_internal(
 id serial PRIMARY KEY,
 email varchar(100),
 username varchar(10) unique,
name varchar(200),
 first_name varchar(100),
  password varchar(100),
role int,
token varchar(200) UNIQUE,
disabled boolean DEFAULT false,
filter varchar(500)
);
 
 CREATE TABLE SELECT_LIST(
 id serial PRIMARY KEY,
 name varchar(50) not null,
 description text,
 label varchar(30) not null
 );
 
 drop table select_list_option;
CREATE TABLE SELECT_LIST_OPTION(
 id serial PRIMARY KEY,
 name varchar(50) not null,
 label varchar(30) not null,
 key varchar(10) not null,
 display_order int,
 select_list_id int not null,
 select_list_option_group_id int
 );
 
 CREATE TABLE SELECT_LIST_OPTION_GROUP(
 id serial PRIMARY KEY,
 name varchar(50) not null,
 label varchar(30) not null,
 select_list_id int not null,
 display_order int
 );
 
 CREATE TABLE AUDIT_TRAIL(
  id serial PRIMARY KEY,
  username varchar(10) NOT NULL,
  operation_type int NOT NULL,
  insert_date timestamp NOT NULL,
  object_type int NOT NULL,
  object_id int,
  source_json text,
  target_json text
);

-- version by project
-- if disabled the version is not shown
 create table version(
  id SERIAL PRIMARY KEY,
  name varchar(250) not null,
  description text,
  status int default 0,
  project_id int not null,
  disabled boolean default false
 );
 
 --foreign key
 ALTER TABLE version ADD CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES project(id);
 
  --add project responsible
 ALTER TABLE project ADD COLUMN responsible int null;

--if disabled the property is not used, like a comment
 create table config_property(
  id SERIAL PRIMARY KEY,
  key_name varchar(100) not null,
  value varchar(250),
  disabled boolean default false
 );


 create table personne(
 id SERIAL PRIMARY KEY,
 nom varchar(200) NOT NULL,
 prenom varchar(200) NOT NULL,
 nom_naissance varchar(200) NOT NULL,
 sexe varchar(10) NOT NULL,
 nationalite varchar(100) NOT NULL,
 date_naissance varchar(12) NOT NULL,
 adresse_num varchar(200) NOT NULL,
 adresse_rue varchar(200) NOT NULL,
 adresse_compl_num varchar(200) NOT NULL,
 adresse_ville varchar(200) NOT NULL,
 adresse_cp varchar(200) NOT NULL,
 adresse_pays varchar(200) NOT NULL
 );
 
 