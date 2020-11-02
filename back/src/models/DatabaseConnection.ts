import Container from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';
import Logger from '../configurations/Logger';
import TypeOrmLogger from '../configurations/TypeOrmLogger';
import properties from '../properties';

export default class DatabaseConnection {
    private static connection: Connection = null;

    public static async getConnection() {
        if (!DatabaseConnection.connection) {
            DatabaseConnection.connection = await DatabaseConnection.establishConnection();
        }

        return this.connection;
    }

    private static async establishConnection() {
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
}
