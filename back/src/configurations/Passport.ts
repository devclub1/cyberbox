/* eslint @typescript-eslint/no-unsafe-assignment: off */

import { OAuth2Strategy } from 'passport-google-oauth';
import { Strategy } from 'passport-github2';
import properties from '../properties';
import AuthService from '../services/AuthService';
import passportType, { PassportStatic } from 'passport';
import { Inject, Service } from 'typedi';

@Service()
export default class Passport {
    private instance: PassportStatic;

    @Inject()
    private authService: AuthService;

    public getPassport(): PassportStatic {
        return this.instance;
    }

    public initialize(): any {
        this.instance = passportType;

        this.configure();

        return this.instance.initialize();
    }

    private configure(): void {
        this.instance.serializeUser((user: any, done: any) => {
            done(null, user);
        });

        this.instance.deserializeUser((user: any, done: any) => {
            done(null, user);
        });

        this.instance.use(new OAuth2Strategy({
            clientID: properties.GOOGLE_CLIENT_ID,
            clientSecret: properties.GOOGLE_SECRET,
            callbackURL: properties.AUTHENTICATION_ROUTE + properties.GOOGLE_CALLBACK_URL,
        }, (accessToken: any, refreshToken: any, profile: any, done: any): void => {
            void this.passportCallbackHandler(accessToken, refreshToken, profile, done);
        }));

        this.instance.use(new Strategy({
            clientID: properties.GITHUB_CLIENT_ID,
            clientSecret: properties.GITHUB_CLIENT_SECRET,
            callbackURL: properties.AUTHENTICATION_ROUTE + properties.GITHUB_CALLBACK_URL,
            scope: ['user:email'],
        }, (accessToken: any, refreshToken: any, profile: any, done: any): void => {
            void this.passportCallbackHandler(accessToken, refreshToken, profile, done);
        }));
    }

    private async passportCallbackHandler(_accessToken: any, _refreshToken: any, profile: any, done: any) {
        let name = [];
        if(profile._json.name !== null){
            name = profile._json.name.split(' ');
        }

        const user = await this.authService.getOrCreateUser(name.length > 0 ? {
            email: profile._json.email || profile.emails[0].value,
            firstName: profile._json.given_name || (name.length > 1 ? name.slice(0, -1).join(' ') : profile._json.name),
            lastName: profile._json.family_name || (name.length > 1 ? name.slice(-1).join('') : '')
        } : {
            email: profile.emails[0].value,
            firstName: profile._json.login,
            lastName: ''
        });

        done(null, user);
    }
}
