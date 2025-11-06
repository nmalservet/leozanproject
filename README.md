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

Make the service file

### Create a unix service

NB systemctl replace the legacy service system

    sudo vi /etc/systemd/system/leozan.service

	[Unit]
	Description=leozan executable jar service
	After=syslog.target
	
	[Service]
	User=leozan
	ExecStart=java -jar /home/leozan/leozan.jar --spring.config.location=file:///home/leozan/config/application.properties 
	SuccessExitStatus=143
	
	StandardOutput=append:/var/log/leozan.log
    StandardError=append:/var/log/leozan_error.log
	
	[Install]
	WantedBy=multi-user.target

Create a symlink

    ln -s /home/leozan/leozan-0.0.2.jar /home/leozan/leozan.jar

Then enable the service ( with user leozan)

    systemctl enable leozan.service


Nb teh logs are stored into /var/log/leozan in prod
so we need to create the folder and also to provide the permissions t the user leozan
# Use the service

    systemctl start leozan.service

To check the status

    systemctl status leozan.service top

## Use lingering to start service out of the user session
    sudo loginctl enable-linger leozan
