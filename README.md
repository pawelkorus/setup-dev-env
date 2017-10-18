# wordpress-dev-server

## Working with docker-compose

To start docker compose bundle in detached mode run:
```
docker-compose up -d
```

To stop docker compose bundle without removing:
```
docker-compose down
```

To remove docker compose containers with anonymous volumes run:
```
docker-compose rm -v
```
You can also specify service name:
```
docker-compose rm -fv <name>
```

## Installing Wordpress
Compose file defines wp-cli service which is used to control various aspects of wordpress. In order to run wp-cli commands use ```docker-compose run``` with ```--rm``` option set, so that container is removed just after wp-cli comand completes.

For wp-cli commands and options refer to the [wp-cli documentation](https://developer.wordpress.org/cli/commands/).

Use following command to download latest version of wordpress:
```
docker-compose run --rm wp-cli core download
```

Next create configuration file by calling ```wp-cli config create``` command. You will need to pass hostname that identifies database container in the network. To determine this value you have two options:
- use ```docker inspect``` to get ip for database container
- a virtual network is created when you run ```docker compose up```. Name of this network is derived from directory name where docker-compose.yml file is located. All services defined in compose file are connected through these network. The hostname for specific service is in the form of <network_name>_<service_name>, i.e. <network_name>_db
```
docker-compose run --rm wp-cli config create --dbname=wordpress --dbuser=root --dbpass=password --dbhost=<db_hostname>
```

If target database is not created yet, then issue following:
```
docker-compose run --rm wp-cli db create
```