import { ExpressMiddlewareInterface } from "routing-controllers";
import { Inject } from "typedi";
import Passport from "../configurations/Passport";

export default class GoogleAuthenticationRedirectMiddleware implements ExpressMiddlewareInterface {
    @Inject()
    private passport: Passport;

    authenticate = (callback: any) => this.passport.getPassport().authenticate('google', { failureRedirect: '/login' }, callback);

    use(request: any, response: any, next: (err?: any) => any) {
        return this.authenticate((err: any, user: any, info: any) => {
            if (err || !user) {
                return next(new Error(info));
            }

            request.user = user;

            next();
        })(request, response, next);
    }
}