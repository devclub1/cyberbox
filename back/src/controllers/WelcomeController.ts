import { CurrentUser, Get, Header, JsonController, UseBefore } from 'routing-controllers';
import AuthenticatedMiddleware from '../middlewares/AuthenticatedMiddleware';
import { User } from '../models/User';

@JsonController()
export class WelcomeController {
    @Get("/")
    welcome() {
        return { message: "Hello world" };
    }

    @Get("/protected")
    @Header("Cache-Control", "none")
    @UseBefore(AuthenticatedMiddleware)
    protectedWelcome(@CurrentUser() user: User) {
        // tslint:disable-next-line:no-console
        console.log(user.email);
        return { message: "hit the protected route" };
    }
}