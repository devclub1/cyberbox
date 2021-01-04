import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import Container from 'typedi';
import { Application } from './Application';
import { exit } from 'process';

import Logger from './configurations/Logger';
import DatabaseConnection from './models/DatabaseConnection';

DatabaseConnection.getConnection()
    .then(() => {
        const app = Container.get(Application);
        app.start();
    })
    .catch((error) => {
        const logger = Container.get(Logger);
        logger.writeError(`${error.message as string} - ${error.stack as string}`);
        exit(-1);
    });