import Container from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import config from '../properties';

export default async function establishDbConnection() {
    useContainer(Container);

    return await createConnection({
        type: 'mysql',
        port: config.DB_PORT,
        host: config.DB_HOST,
        database: config.DB_NAME,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        synchronize: true,
        logging: true,
        entities: [
            __dirname + "/*.js"
        ]
    });
}