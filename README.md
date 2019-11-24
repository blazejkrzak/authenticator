# authenticator

NodeJS authenticator

# Run
```
cp docker-compose.override.yml.dist docker-compose.override.yml
docker-compose up -d
docker-compose exec web yarn install
docker-compose exec web node app.js
```