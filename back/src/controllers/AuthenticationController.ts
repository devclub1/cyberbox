import { Get, JsonController, Req, Res, Session, UseBefore } from "routing-controllers";
import { GoogleAuthenticationMiddleware } from "../middlewares/GoogleAuthenticationMiddleware";
import GoogleAuthenticationRedirectMiddleware from "../middlewares/GoogleAuthenticationRedirectMiddleware";
import { Request, Response } from 'express';

@JsonController("/authentication")
export class AuthenticationController {

    @Get("/google")
    @UseBefore(GoogleAuthenticationMiddleware)
    // tslint:disable-next-line: no-empty
    authenticateGoogle() { }

    @Get("/google/callback")
    @UseBefore(GoogleAuthenticationRedirectMiddleware)
    authenticateGoogleCallback(@Req() req: Request, @Res() res: Response, @Session() session: any) {
        session.user = req.user;
        res.redirect("/api/protected");
    }
}