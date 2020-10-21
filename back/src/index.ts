import 'reflect-metadata';
import Container from 'typedi';
import establishDbConnection from './models/db';
import { Application } from './Application';
import { exit } from 'process';

establishDbConnection()
    .then(() => {
        const app = Container.get(Application);
        app.start();
    })
    .catch((error) => {
        // tslint:disable-next-line:no-console
        console.log(error.message);

        exit(-1);
    })