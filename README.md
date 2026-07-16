# leozanproject
Web Application to manage studies related to the association Leozan

#Install 

## Create the database

     create user leozan with encrypted password 'leozan';
     create database leozan owner leozan;

The schema and reference data are no longer applied manually: Liquibase now manages them
automatically on application startup, from the changesets in
`src/main/resources/db/changelog/` (see `db.changelog-master.xml`). Just create the empty
database above and start the app; Liquibase creates every table and the initial roles/status
options for you.

### Existing database created before this change

Every changeset carries a precondition (table/column/constraint doesn't already exist, or the
seed row isn't already there) with `onFail="MARK_RAN"`. So if your database already has the
schema applied the old way (via `sql/schema.sql` and `sql/init.sql`), Liquibase detects each
table/row is already there, marks that changeset as run without touching it, and moves on — no
manual step needed, startup just works.

If you'd rather bookkeep it explicitly yourself instead of relying on the preconditions (e.g. to
double check what Liquibase considers already applied), you can still run this once instead:

    mvn liquibase:changelogSync \
        -Dliquibase.url=jdbc:postgresql://localhost:5432/leozan \
        -Dliquibase.username=leozan -Dliquibase.password=leozan

That records every existing changeset as already applied without touching your data or schema;
any changeset added after this point will run normally.

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

<<<<<<< Updated upstream
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
=======
To test

http://myip:8082/

>>>>>>> Stashed changes
