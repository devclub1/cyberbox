import { Controller, Get, Req, Res, Session, UseBefore } from 'routing-controllers';
import { GoogleAuthenticationMiddleware } from '../middlewares/GoogleAuthenticationMiddleware';
import GoogleAuthenticationRedirectMiddleware from '../middlewares/GoogleAuthenticationRedirectMiddleware';
import { Request, Response } from 'express';
import { GithubAuthenticationMiddleware } from '../middlewares/GithubAuthenticationMiddleware';
import GithubAuthenticationRedirectMiddleware from '../middlewares/GithubAuthenticationRedirectMiddleware';

@Controller('/authentication')
export class AuthController {

    @Get('/google')
    @UseBefore(GoogleAuthenticationMiddleware)
    // tslint:disable-next-line: no-empty
    authenticateGoogle() { }

    @Get('/github')
    @UseBefore(GithubAuthenticationMiddleware)
    // tslint:disable-next-line: no-empty
    authenticateGithub() { }

    @Get('/google/callback')
    @UseBefore(GoogleAuthenticationRedirectMiddleware)
    authenticateGoogleCallback(@Req() req: Request, @Res() res: Response, @Session() session: any) {
        session.user = req.user;
        res.redirect('/api/protected');

        // special case - don't do that in other places
        return res;
    }

    @Get('/github/callback')
    @UseBefore(GithubAuthenticationRedirectMiddleware)
    authenticateGithubCallback(@Req() req: Request, @Res() res: Response, @Session() session: any) {
        session.user = req.user;
        res.redirect('/api/protected');

        // special case - don't do that in other places
        return res;
    }
}