import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import Container from 'typedi';
import { Application } from './Application';
import { exit } from 'process';

import establishDbConnection from './models/db';
import Logger from './configurations/Logger';

establishDbConnection()
    .then(() => {
        const app = Container.get(Application);
        app.start();
    })
    .catch((error) => {
        const logger = Container.get(Logger);
        logger.writeError(`${error.message} - ${error.stack}`);
        exit(-1);
    });