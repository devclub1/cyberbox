import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from 'express';
import BusinessError from "../types/BusinessError";

export default class AuthenticatedMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next?: (err?: any) => any,) {
        const user = req.session.user;

        if (user && typeof user.id === 'number') {
            next();
        } else {
            next(new BusinessError("Invalid cookie", 401, false));
        }
    }
}