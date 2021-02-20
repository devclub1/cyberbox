import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Inject } from 'typedi';
import Passport from '../configurations/Passport';

export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  @Inject()
  private passport: Passport;

  readonly scopes = new Map([['google', ['profile', 'email']], ['github', ['user:email']]]);

  use(req: Request, res: Response, next?: (err?: any) => any): any {
    const strategy = req.url.split('/')[3];
    return this.passport.getPassport().authenticate(strategy, { scope: this.scopes.get(strategy)})(req, res, next);
  }
}