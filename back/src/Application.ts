import express, { NextFunction, Request, Response } from 'express';
import Container, { Inject } from 'typedi';
import config from './properties';
import morgan from 'morgan';

import Logger from './configurations/Logger';
import { Action, useContainer, useExpressServer } from "routing-controllers";
import { WelcomeController } from './controllers/WelcomeController';
import { AuthenticationController } from './controllers/AuthenticationController';
import Passport from './configurations/Passport';
import session from 'client-sessions';
import { UserRepository } from './repositories/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import AuthenticationService from './services/AuthenticationService';

export class Application {
    private instance: express.Application;

    @Inject()
    private logger: Logger;

    @Inject()
    private passport: Passport;

    @Inject()
    private authenticationService: AuthenticationService;

    constructor() {
        useContainer(Container);
    }

    public async start() {
        this.instance = express();

        this.instance.use(session(
            {
                cookieName: 'session',
                secret: config.COOKIE_SECRET,
                // example
                duration: 24 * 60 * 60 * 1000,
            }
        ));

        this.instance.use(this.passport.initialize(config.AUTHENTICATION_ROUTE));

        this.instance.use(morgan('combined', this.logger.getMorganOptions()));

        this.instance.use((error: Error, _req: Request, _res: Response, next: NextFunction) => {
            this.logger.writeError(error.message, error.stack);
            next();
        });

        useExpressServer(this.instance, {
            routePrefix: "/api",
            controllers: [
                WelcomeController,
                AuthenticationController
            ],
            currentUserChecker: async (action: Action) => {
                return await this.authenticationService.getUserById(action.request.session.user.id);
            }
        });

        this.instance.listen(config.PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`Server started at http://localhost:${config.PORT}`);
        })
    }
}