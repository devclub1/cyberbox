import express, { NextFunction, Request, Response } from 'express';
import PassportConfig from "./config/PassportConfig";
import config from './properties';
import dbConnection from './models/db';

export class Application {
    private instance: any;

    constructor() {
        this.instance = express();
    }

    public async start() {
        // tslint:disable-next-line: no-unused-expression
        await dbConnection() || this.throwAppError();

        this.instance.use(PassportConfig.initialize());

        this.instance.get('/auth/google', PassportConfig.getPassport().authenticate('google', { scope: ['profile', 'email'] }));
        this.instance.get('/auth/google/callback', PassportConfig.getPassport().authenticate('google', { failureRedirect: '/login' }), (req: Request, res: Response) => {
            res.redirect('/hello');
        });

        this.instance.set('views', __dirname + '/views');
        this.instance.set('view engine', 'pug');

        this.instance.get('/', (req: Request, res: Response) => {
            res.render('index', { buttonSpan: 'Sign in', url: '/auth/google' })
        })
        this.instance.get('/hello', (req: Request, res: Response) => {
            res.send('Hello world!');
        });

        this.instance.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(500).send({ message: "A nasty error occurred" });
        });

        this.instance.listen(config.PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`Server started at http://localhost:${config.PORT}`);
        });
    }

    throwAppError() {
        throw new Error("an error happened");
    }
}