import { User } from '../models/User';
import { WelcomeSchema } from '../schemas/WelcomeSchema';
import { OpenAPI } from 'routing-controllers-openapi';
import { Body, CurrentUser, Get, Header, JsonController, Post, UseBefore } from 'routing-controllers';

import AuthenticatedMiddleware from '../middlewares/AuthenticatedMiddleware';
@JsonController()
export class WelcomeController {
    @Get('/')
    welcome() {
        return { message: 'Hello world' };
    }

    @Get('/protected')
    @Header('Cache-Control', 'none')
    @UseBefore(AuthenticatedMiddleware)
    @OpenAPI({ security: [{ cookieAuth: [] }] })
    protectedWelcome(@CurrentUser() user: User) {
        // tslint:disable-next-line:no-console
        console.log(user.email);
        return { message: 'hit the protected get route' };
    }

    @Post('/protected')
    @Header('Cache-Control', 'none')
    @UseBefore(AuthenticatedMiddleware)
    @OpenAPI({ security: [{ cookieAuth: [] }] })
    protectedWelcomePost(@CurrentUser() user: User, @Body() body: WelcomeSchema) {
        // tslint:disable-next-line:no-console
        console.log(user.email);
        return { message: 'hit the protected post route' };
    }
}