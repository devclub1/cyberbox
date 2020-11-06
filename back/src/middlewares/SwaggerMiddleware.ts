import { ExpressMiddlewareInterface } from 'routing-controllers';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';

export class SwaggerMiddleware implements ExpressMiddlewareInterface {

    use(req: any, res: any, next?: (err?: any) => any): any {
        swaggerUI.serveFiles(swaggerUI.setup(yaml.load('swagger.yaml')));
        next();
    }

}