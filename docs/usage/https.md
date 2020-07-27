# HTTPS

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

  # You can add custom SSL parameters here

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
