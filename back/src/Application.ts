import properties from './properties';

import morgan from 'morgan';
import express from 'express';
import sessions from 'client-sessions';
import Container, { Inject } from 'typedi';
import Logger from './configurations/Logger';
import Passport from './configurations/Passport';
import AuthService from './services/AuthService';
import AuthenticatedMiddleware from './middlewares/AuthenticatedMiddleware';
import { OpenAPI } from './configurations/OpenAPI';
import { Action, useContainer, useExpressServer } from 'routing-controllers';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';

export class Application {
    private instance: express.Application;

    @Inject()
    private logger: Logger;

    @Inject()
    private passport: Passport;

    @Inject()
    private authService: AuthService;

    constructor() {
        useContainer(Container);
    }

    public initialize(): void {
        this.instance = express();

        this.instance.use(sessions(
            {
                cookieName: 'session',
                secret: properties.COOKIE_SECRET,
                duration: parseInt(properties.COOKIE_DURATION, 10),
                activeDuration: parseInt(properties.COOKIE_ACTIVE_DURATION, 10),
                cookie: {
                    path: '/api',
                    httpOnly: true,
                    secure: properties.COOKIE_SECURE_SETTING
                }
            }
        ));

        this.instance.use(this.passport.initialize());

        this.instance.use(morgan('combined', this.logger.getMorganOptions()));

        useExpressServer(this.instance, {
            routePrefix: '/api',
            controllers: [
                __dirname + '/controllers/*.js'
            ],
            middlewares: [
                ErrorHandlerMiddleware,
                AuthenticatedMiddleware
            ],
            defaultErrorHandler: false,
            currentUserChecker: async (action: Action) => {
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
                return await this.authService.getUserById(action.request.session.user.id);
            }
        });

        if (!properties.PROD) {
            OpenAPI.configure(this.instance);
        }
    }

    public start(): void {
        if (!this.instance) {
            this.initialize();
        }

        this.instance.listen(properties.PORT, () => {
            this.logger.writeInfo(`Server started at http://localhost:${properties.PORT}`);
        });
    }
}