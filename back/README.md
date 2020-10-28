# cyberbox - back

### To avoid installing MySQL, you can use Docker 

```docker
docker run --name cyberbox-db -p 3306:3306 -d axbg/cyberbox-db
```

### Then configure .env
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cyberbox
DB_USER=cyberbox
DB_PASSWORD=cyberbox
```