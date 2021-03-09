import { Controller, Get, Req, Res, Session, UseBefore } from 'routing-controllers';
import { Request, Response } from 'express';
import AuthenticationRedirectMiddleware from '../middlewares/AuthenticationRedirectMiddleware';
import { AuthenticationMiddleware } from '../middlewares/AuthenticationMiddleware';

@Controller('/authentication')
export class AuthController {

    @Get('/google')
    @UseBefore(AuthenticationMiddleware)
    authenticateGoogle() { }

    @Get('/github')
    @UseBefore(AuthenticationMiddleware)
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