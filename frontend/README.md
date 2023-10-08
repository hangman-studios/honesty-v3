# Start
- on Mac, make sure your Docker filesystem uses VitioFS
- in project folder run
```
mkcert -cert-file certs/localhost-cert.pem -key-file certs/localhost-key.pem "*.app.localhost"
```
see https://knplabs.com/en/blog/how-to-handle-https-with-docker-compose-and-mkcert-for-local-development
- then run `docker compose up`

# Tasks
- create new migration: `docker compose run --rm cli bash -c 'yarn supabase migration new name_in_snake_case'`
- apply migration by restarting cli container `docker compose restart cli`

# Notes
- url for realtime must start with `http://realtime-dev. ...` after kong gateway. Otherwise tenant must be changes

# Todos
- check postgres policies to allow only authenticated
