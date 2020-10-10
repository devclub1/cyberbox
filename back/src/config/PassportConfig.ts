import { OAuth2Strategy } from 'passport-google-oauth';
import { Strategy } from 'passport-github2';
import config from '../properties';
import AuthenticationService from '../services/AuthenticationService';
import passportType, { PassportStatic } from 'passport';
import Container from 'typedi';

export default class PassportConfig {
    private static passport: PassportStatic;

    public static getPassport(): PassportStatic {
        return this.passport;
    }

    public static initialize() {
        this.passport = passportType;
        this.configurePassport();
        return this.passport.initialize();
    }

    private static configurePassport() {
        this.passport.serializeUser((user: any, done: any) => {
            done(null, user);
        });

        this.passport.deserializeUser((user: any, done: any) => {
            done(null, user);
        });

        this.passport.use(new OAuth2Strategy({
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_SECRET,
            callbackURL: '/auth/google/callback',
        }, this.passportCallbackHandler));

        this.passport.use(new Strategy({
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/auth/github/callback',
            scope: ['user:email'],
        }, this.passportCallbackHandler))
    }

    private static async passportCallbackHandler(accessToken: any, refreshToken: any, profile: any, done: any) {
        const authenticationService = Container.get(AuthenticationService);
        const user = await authenticationService.getOrCreateUser({
            email: profile._json.email || profile.emails[0].value,
            name:  profile._json.name || (profile._json.first_name || profile._json.given_name + ' ' + profile._json.last_name || profile._json.family_name)
        });

        done(null, user);
    };
}
