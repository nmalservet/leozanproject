# leozanproject
Web Application to manage studies related to the association Leozan

#Install 

## Create the database

     create user leozan with encrypted password 'leozan';
     create database leozan owner leozan;
     
 Apply the schema and init scripts
 	
    psql -U leozan -d leozan < schema.sql
    psql -U leozan -d leozan < init.sql
 	
 	
## Start the Application server

