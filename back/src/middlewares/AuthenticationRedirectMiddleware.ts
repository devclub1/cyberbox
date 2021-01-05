import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Inject } from 'typedi';
import Passport from '../configurations/Passport';
import BusinessError from '../types/BusinessError';

export default class AuthenticationRedirectMiddleware implements ExpressMiddlewareInterface {
    @Inject()
    private passport: Passport;

    private stragety: string;

    use(request: any, response: any, next: (err?: any) => any): any {
        this.stragety = request.route.path.split('/')[3];
        return this.passport.getPassport().authenticate(this.stragety, { failureRedirect: '/login' },
            (err: any, user: any, info: any) => {
                if (err || !user) {
                    return next(new BusinessError(info, 401, false));
                }

                request.user = user;
                next();
            }
        )(request, response, next);
    }
}