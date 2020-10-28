import Container from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import Logger from '../configurations/Logger';
import TypeOrmLogger from '../configurations/TypeOrmLogger';
import properties from '../properties';

export default async function establishDbConnection() {
    useContainer(Container);

    return await createConnection({
        type: 'mysql',
        port: parseInt(properties.DB_PORT, 10),
        host: properties.DB_HOST,
        database: properties.DB_NAME,
        username: properties.DB_USER,
        password: properties.DB_PASSWORD,
        synchronize: true,
        logger: new TypeOrmLogger(Container.get(Logger)),
        entities: [
            __dirname + "/*.js"
        ]
    });
}