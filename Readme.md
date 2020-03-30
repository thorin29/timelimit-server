# TimeLimit-Server

This is the server for the connected mode in TimeLimit.

## Clustering

This application only supports running a single instance of it.
When clustering, push messages do not work anymore between devices
connected to different devices and the rate limiting is per instance.

## Running

Option 1: Build (run ``sudo docker build -t timelimit-server .`` in this directory) and use a docker image  
Option 2: Install Node.JS (see below for detailed usage)

To test it, open ``http://server/time``, it should show a timestamp

## Commands

### npm start

This runs all pending migrations and starts the server.

### npm run build

This "compiles" the application.

### npm run lint:fix

This fixes the causes of lint warnings (where possible).

## Configuration (environment variables)

- DATABASE_URL
  - this specifies the database to use
  - default value: ``sqlite://test.db`` (sqlite database in the source code directory)
  - supports mysql, postgresql and sqlite (sqlite in development builds only because it's declared as dev dependency)
  - looks like ``postgres://user:pass@example.com:5432/dbname``
  - no extra setup needed
      - when starting the application, the database tables are created/ migrated
        - this only works for upgrading; if you intend to eventually downgrade, make a backup first (you should make backups in all cases before an upgrade)
- PORT
  - the port at which the server should listen
- NODE_ENV
  - should be set to ``production`` in production
  - when using ``development``, then mails are not sent; instead they are written to a html file which is opened
- GOOGLE_PLAY_PUBLIC_KEY
  - key for validating purchases
  - purchases using google play don't work without it
- MAIL_SENDER
  - sender (for the from-field) for sent mails
- MAIL_TRANSPORT
  - a JSON encoded configuration for nodemailer (object with service and auth)
  - see <https://nodemailer.com/smtp/well-known/> for examples
  - default value is ``null``
- MAIL_IMPRINT
  - a string which is added to the footer of the sent mails
  - default value: ``not defined``
- ADMIN_TOKEN
  - a password which allows to use some APIs
  - admin APIs are disabled when this is not set
- MAIL_SERVER_BLACKLIST
  - list of domains, separated by comma
  - if the user tries to use such a mail service, then he will get the notification that this provider is not supported
- MAIL_WHITELIST
  - list of mail addresses (``someone@somewhere.com``) or domains (``mailbox.org``), separated by comma
  - if a user requests signing in with a mail address which is not in this list, then the request is rejected
  - if the list is empty, then any mail address (except with domains from the blacklist) is allowed
  - note: this allows a third party who knows the server url to check if a certain mail address is allowed by trying to sign in with it
- DISABLE_SIGNUP
  - ``yes`` or ``no`` (default: no)
  - disables creating new families if ``yes`` is selected
- PING_INTERVAL_SEC
  - ping interval at the websocket in seconds

## HTTPS

This server application itself does not support HTTPS. You have to use
an other tool to use HTTPS. One options for this is to use nginx with the
following site config:

```
# don't forget to update the port for your local configuration
#
# the max_fails is important - otherwise nginx
# marks the server sometimes as unreachable if it is restarted
# or starts after nginx
upstream timelimitbackend {
  server localhost:8080 max_fails=0;
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;

  # don't forget to update the domain
  server_name my.domain;

  # don't forget to update the paths
  ssl_certificate /my/fullchain.pem;
  ssl_certificate_key /my/privkey.pem;

  # eventually configure the SSL parameters here

  location / {
    proxy_pass http://timelimitbackend/;

    client_max_body_size 10m;
    # the following is required for websocket support
    #
    # without websockets, the client will not detect
    # that there is a connection and it will not sync
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
  }
}
```

## Admin API

When the ``ADMIN_TOKEN`` environment variable was set, then there is a admin API available
at ``http(s)://server/admin``. It can be used by the [TimeLimit Server Admin UI](https://codeberg.org/timelimit/timelimit-server-ui).

## Purchases

To enable the automated purchase feature, set the ``GOOGLE_PLAY_PUBLIC_KEY`` environment variable.
The value for the official builds which are distributed using the Play Store can
be found at <https://codeberg.org/timelimit/timelimit-android/src/commit/3da677877f4dde0b1b01523daae33745f14e08ac/app/build.gradle#L49>.

Additionally, there is the admin API which allows one to unlock the
premium features.

## example docker-compose.yml with included database

(don't forget to build the docker image first)

```
version: '3'
services:
  api:
    image: 'timelimit-server:latest'
    environment:
      NODE_ENV: production
      DATABASE_URL: mariadb://timelimit:timelimitpassword@database:3306/timelimit
      PORT: 8080
      # put additional config variables here
    ports:
     - "8080:8080"
    restart: always
    # you should enable logging/ comment this out during testing
    #logging:
    #  driver: none
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
```

The database files will be saved at the folder which contains the docker-compose.yml.
You should change the passwords.

Docker starts both (TimeLimit and the database) at the same time,
so the TimeLimit server will crash a few times due to the missing database
before it starts working.

## example docker-compose.yml with external databases

(don't forget to build the docker image first)

```
version: '2'
services:
  api:
    image: 'timelimit-server:latest'
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://user:pass@example.com:5432/dbname
      PORT: 8080
      # put additional config variables here
    restart: always
    # you should enable logging during testing
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
