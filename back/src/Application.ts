import express from 'express';
import Container, { Inject } from 'typedi';
import properties from './properties';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import Logger from './configurations/Logger';
import { Action, useContainer, useExpressServer } from 'routing-controllers';
import Passport from './configurations/Passport';
import sessions from 'client-sessions';
import AuthService from './services/AuthService';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';
import AuthenticatedMiddleware from './middlewares/AuthenticatedMiddleware';

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

    public async initialize() {
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

        const swaggerDocument = YAML.load('../swagger.yaml');
        this.instance.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
                return await this.authService.getUserById(action.request.session.user.id);
            }
        });

    }

    public async start() {
        if (!this.instance) {
            await this.initialize();
        }

        this.instance.listen(properties.PORT, () => {
            this.logger.writeInfo(`Server started at http://localhost:${properties.PORT}`);
        });
    }
}