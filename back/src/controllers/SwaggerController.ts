import { Controller, Get, UseBefore } from 'routing-controllers';
import { SwaggerMiddleware } from '../middlewares/SwaggerMiddleware';

@Controller('/swagger')
export class SwaggerController {

    @Get('/')
    @UseBefore(SwaggerMiddleware)
    // tslint:disable-next-line: no-empty
    swagger() { }

}