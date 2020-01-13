# TimeLimit-Server

This is the server for the connected mode in TimeLimit.

## Clustering

This application only supports running a single instance of it.
When clustering, push messages do not work anymore between devices
connected to different devices and the rate limiting is per instance.

## Running

Option 1: Build (run ``sudo docker build -t timelimit-server .`` in this directory) and use a docker image  
Option 2: Install Node.JS (see below for detailed usage)

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
