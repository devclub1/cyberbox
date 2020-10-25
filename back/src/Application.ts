import express, { NextFunction, Request, Response } from 'express';
import Container, { Inject } from 'typedi';
import config from './properties';
import morgan from 'morgan';

import Logger from './configurations/Logger';
import { Action, useContainer, useExpressServer } from "routing-controllers";
import Passport from './configurations/Passport';
import session from 'client-sessions';
import AuthenticationService from './services/AuthenticationService';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';

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
                duration: config.COOKIE_DURATION,
                activeDuration: config.COOKIE_ACTIVE_DURATION,
                cookie: {
                    path: '/api',
                    httpOnly: true,
                    secure: config.COOKIE_SECURE_SETTING
                }
            }
        ));

        this.instance.use(this.passport.initialize());

        this.instance.use(morgan('combined', this.logger.getMorganOptions()));

        useExpressServer(this.instance, {
            routePrefix: "/api",
            controllers: [
                __dirname + '/controllers/*.js'
            ],
            middlewares: [
                ErrorHandlerMiddleware
            ],
            defaultErrorHandler: false,
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