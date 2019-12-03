# authenticator

NodeJS authenticator

# Run
```
cp docker-compose.override.yml.dist docker-compose.override.yml
docker-compose up -d
```


### Comunication between nodejs and ssc
`web` cointainer communicates with `ssc-node` via ipc