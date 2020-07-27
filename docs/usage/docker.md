# Docker

You can run the timelimit server with docker. Here are two example configuration files:

## Important

The ``image: 'timelimit-server:latest'`` will not work out of the box.
You have to build this image yourself (using ``sudo docker build -t timelimit-server .``
within the root directory of this git repository) or you can replace it by
``image: docker.timelimit.io/timelimit-server`` which will use prebuilt docker
images.

## example docker-compose.yml with included database

```
version: '3'
services:
  api:
    image: 'timelimit-server:latest'
    environment:
      NODE_ENV: production
      DATABASE_URL: mariadb://timelimit:timelimitpassword@database:3306/timelimit
      PORT: 8080
      MAIL_SENDER: me@my.timelimit.server
      MAIL_TRANSPORT: '{"host": "localhost", "port": 25}'
      # put additional config variables here
    ports:
     - "8080:8080"
    restart: always
    # you can enable logging during testing by commenting this out,
    # but logging is not needed when everything works
    logging:
      driver: none
    links:
    - database
  database:
    image: 'mariadb:10'
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: timelimit
      MYSQL_USER: timelimit
      MYSQL_PASSWORD: timelimitpassword
    volumes:
     - ./database:/var/lib/mysql
    # you can enable logging during testing by commenting this out,
    # but logging is not needed when everything works
    logging:
      driver: none
```

The database files will be saved at the folder which contains the docker-compose.yml.
You should change the passwords.

Docker starts both (TimeLimit and the database) at the same time,
so the TimeLimit server will crash a few times due to the missing database
before it starts working.

## example docker-compose.yml with external databases

```
version: '2'
services:
  api:
    image: 'timelimit-server:latest'
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://user:pass@example.com:5432/dbname
      PORT: 8080
      MAIL_SENDER: me@my.timelimit.server
      MAIL_TRANSPORT: '{"host": "localhost", "port": 25}'
      # put additional config variables here
    restart: always
    # you can enable logging during testing by commenting this out,
    # but logging is not needed when everything works
    logging:
      driver: none
    # easy solution to use a database which does not run within docker
    network_mode: "host"
    # otherwise:
    # redirect host port 9000 to guest port 8080 (to allow access to the API)
    # ports:
    #  - "9000:8080"
    # in case the database runs outside of docker and you don't want to use the host network mode, see
    # https://forums.docker.com/t/accessing-host-machine-from-within-docker-container/14248
```
