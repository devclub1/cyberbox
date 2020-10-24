import { ExpressMiddlewareInterface } from "routing-controllers";
import { Inject } from "typedi";
import Passport from "../configurations/Passport";

export class GoogleAuthenticationMiddleware implements ExpressMiddlewareInterface {
    @Inject()
    private passport: Passport;

    use(req: Request, res: Response, next?: (err?: any) => any): any {
      return this.passport.getPassport().authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }
  }