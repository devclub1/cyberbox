import { Controller, Get, Req, Res, Session, UseBefore } from 'routing-controllers';
import { GoogleAuthenticationMiddleware } from '../middlewares/GoogleAuthenticationMiddleware';
import { Request, Response } from 'express';
import { GithubAuthenticationMiddleware } from '../middlewares/GithubAuthenticationMiddleware';
import AuthenticationRedirectMiddleware from '../middlewares/AuthenticationRedirectMiddleware';

@Controller('/authentication')
export class AuthController {

    @Get('/google')
    @UseBefore(GoogleAuthenticationMiddleware)
    authenticateGoogle() { }

    @Get('/github')
    @UseBefore(GithubAuthenticationMiddleware)
    authenticateGithub() { }

    @Get('/google/callback')
    @UseBefore(AuthenticationRedirectMiddleware)
    authenticateGoogleCallback(@Req() req: Request, @Res() res: Response, @Session() session: any) {
        session.user = req.user;
        res.redirect('/api/protected');

        // special case - don't do that in other places
        return res;
    }

    @Get('/github/callback')
    @UseBefore(AuthenticationRedirectMiddleware)
    authenticateGithubCallback(@Req() req: Request, @Res() res: Response, @Session() session: any) {
        session.user = req.user;
        res.redirect('/api/protected');

        // special case - don't do that in other places
        return res;
    }
}