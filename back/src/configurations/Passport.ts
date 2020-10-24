import { OAuth2Strategy } from 'passport-google-oauth';
import { Strategy } from 'passport-github2';
import config from '../properties';
import AuthenticationService from '../services/AuthenticationService';
import passportType, { PassportStatic } from 'passport';
import { Inject, Service } from 'typedi';

@Service()
export default class Passport {
    private instance: PassportStatic;

    @Inject()
    private authenticationService: AuthenticationService;

    public getPassport(): PassportStatic {
        return this.instance;
    }

    public initialize(prefix: string): any {
        this.instance = passportType;

        this.configure(prefix);

        return this.instance.initialize();
    }

    private configure(prefix: string): void {
        this.instance.serializeUser((user: any, done: any) => {
            done(null, user);
        });

        this.instance.deserializeUser((user: any, done: any) => {
            done(null, user);
        });

        this.instance.use(new OAuth2Strategy({
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_SECRET,
            callbackURL: prefix + '/google/callback',
        }, (accessToken: any, refreshToken: any, profile: any, done: any) => {
            this.passportCallbackHandler(accessToken, refreshToken, profile, done)
        }));

        this.instance.use(new Strategy({
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: prefix + '/github/callback',
            scope: ['user:email'],
        }, (accessToken: any, refreshToken: any, profile: any, done: any) => {
            this.passportCallbackHandler(accessToken, refreshToken, profile, done)
        }));
    }

    private async passportCallbackHandler(_accessToken: any, _refreshToken: any, profile: any, done: any) {
        const user = await this.authenticationService.getOrCreateUser({
            email: profile._json.email || profile.emails[0].value,
            name: profile._json.name || (profile._json.first_name || profile._json.given_name + ' ' + profile._json.last_name || profile._json.family_name)
        });

        done(null, user);
    };
}
