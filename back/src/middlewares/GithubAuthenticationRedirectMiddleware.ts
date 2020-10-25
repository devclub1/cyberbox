import { ExpressMiddlewareInterface } from "routing-controllers";
import { Inject } from "typedi";
import Passport from "../configurations/Passport";

export default class GithubAuthenticationRedirectMiddleware implements ExpressMiddlewareInterface {
    @Inject()
    private passport: Passport;

    use(request: any, response: any, next: (err?: any) => any) {
        return this.passport.getPassport().authenticate('github', { failureRedirect: '/login' },
            (err: any, user: any, info: any) => {
                if (err || !user) {
                    return next(new Error(info));
                }

                request.user = user;
                next();
            }
        )(request, response, next);
    }
}