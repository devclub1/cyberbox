# cyberbox - back

[![codecov](https://codecov.io/gh/devclub1/cyberbox/branch/ts/graph/badge.svg?token=5KKATHGI8S)](https://codecov.io/gh/devclub1/cyberbox)

## Useful CLI commands
* npm run build - build the application
* npm start - build & start the application
* npm run dev - build & restart the app on every change
* npm test - run all the tests
* npm run test-watch - run all the tests with verbose output
* npm run coverage - create coverage report & update *coverage shield* in README.md 
* npm run migrate MIGRATION_NAME_ - create a database migration 

## Deployment
### You can deploy the app in 3 ways:
* Manually *(recommended for back-end development)*
    1. Run the database as a Docker container
        ```docker
        docker run --name cyberbox-db -p 3306:3306 -d axbg/cyberbox-db
        ```
    2. Replace the values of the following fields in .env
        ```
        DB_HOST=localhost
        DB_PORT=3306
        DB_NAME=cyberbox
        DB_USER=cyberbox
        DB_PASSWORD=cyberbox
        ```
    3. Fill the other fields (optional)
    4. Run **npm start**
#
* Using Docker containers managed manually *(recommended during front-end integration)*
    1. Run the database as a Docker container
        ```docker
        docker run --name cyberbox-db -p 3306:3306 -d axbg/cyberbox-db
        ```
    2. Replace the values of the following fields in .env
        ```
        DB_HOST=host.docker.internal
        DB_PORT=3306
        DB_NAME=cyberbox
        DB_USER=cyberbox
        DB_PASSWORD=cyberbox
        ```
    3. Fill the other fields (optional)
    4. Run **docker run -d --env-file .\.env --name cbox -p 8080:8080 axbg/cyberbox-back**    
#
* Using Docker Compose *(recommended in DevOps pipelines)*
    1. Replace the values of the following fields in .env
        ```
        DB_HOST=db
        DB_PORT=3306
        DB_NAME=cyberbox
        DB_USER=cyberbox
        DB_PASSWORD=cyberbox
        ```
    2. Fill the other fields (optional)
    3. Run **docker-compose up -d**