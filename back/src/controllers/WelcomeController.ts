import { Get, JsonController, Req, Res, Session, UseBefore } from 'routing-controllers';
import { Authenticated } from '../middlewares/AuthenticatedMiddleware';
import { Request } from 'express';

@JsonController()
export class WelcomeController {
    @Get("/")
    welcome() {
        return { message: "Hello world" };
    }

    @Get("/protected")
    @UseBefore(Authenticated)
    protectedWelcome(@Req() req: Request, @Session() session: any) {
        // tslint:disable-next-line:no-console
        return { message: "hit the protected route" };
    }

}