import express from 'express';
import passport from './utils/security';
import dbConnection from './models/db';
import config from './properties';

const app = express();

dbConnection();

app.use(passport.initialize());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/hello');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { buttonSpan: 'Sign in', url: '/auth/google' })
})

app.get('/hello', (req, res) => {
    res.send('Hello world!');
});

app.listen(config.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${config.PORT}`);
});