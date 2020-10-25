import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from 'express';

export class Authenticated implements ExpressMiddlewareInterface {
    use(req: Request, _res: Response, next?: (err?: any) => any,) {
        const user = req.session.user;

        if (user && typeof user.id === 'number') {
            next();
        } else {
            next(new Error("Invalid cookie"));
        }
    }
}