# wordpress-dev-server

To start docker compose bundle in detached mode run:
```
docker-compose up -d
```
After this wordpress is available under 127.0.0.1:8000

To stop docker compose bundle without removing:
```
docker-compose down
```

To remove docker compose containers run:
```
docker-compose rm -fv <name>
```