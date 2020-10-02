import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';

import * as config  from '../properties';
import * as service from '../services/authentication';

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const callbackHandler = async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    const user = await service.getOrCreateUser({
      email: profile._json.email,
      firstname: profile._json.first_name || profile._json.given_name,
      lastname: profile._json.last_name || profile._json.family_name,
    });

    done(null, user);
};

passport.use(new OAuth2Strategy({
    clientID: config.default.GOOGLE_CLIENT_ID,
    clientSecret: config.default.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
}, callbackHandler));

export default passport;




