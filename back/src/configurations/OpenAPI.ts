import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

export class OpenAPI {
    public static configure(app: express.Application) {
        const schemas = validationMetadatasToSchemas({
            refPointerPrefix: '#/components/schemas/',
        });

        const swaggerFile = routingControllersToSpec(
            getMetadataArgsStorage(),
            { routePrefix: '/api' },
            {
                components: {
                    schemas,
                    securitySchemes: {
                        cookieAuth: {
                            type: 'apiKey',
                            in: 'cookie',
                            name: 'session'
                        },
                    },
                }
            });

        swaggerFile.info = {
            title: 'cyberbox-swagger',
            version: '0.0.1'
        };

        app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
    }
}
