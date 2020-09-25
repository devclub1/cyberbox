import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';

export const dbConnection = async () => {

    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'db-user',
        password: 'db-password',
        database: 'db-name',
        entities: [
            __dirname + '/*.js'
        ],
        synchronize: true,
    });

    const connection = await createConnection(connectionOptions);

}
