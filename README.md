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



##  Install and Deploy
Build the archive 

    mvn clean install -D skipTests


Create a unix user

useradd -m -g users leozan


Create a fodler config inside the new home directory leozan
cd /home/leozan
mkdir config

Copy the properties inside the folder
cd config
vi application.properties

Replace with your values like the application.properties inside the project

Open the postgres server

Create the db
sudo -i -u postgres
psql
create user leozan with encrypted password 'leozan';

create database leozan owner leozan;

Move the archive built
mv leozan-0.0.1.jar /home/leozan/

Start the process
make a symbolic link

java -jar leozan-0.0.1.jar config/application.properties

