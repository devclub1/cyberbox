import 'reflect-metadata';
import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';

const dbConnection = async () => {
    const connectionOptions: ConnectionOptions = await getConnectionOptions();
    await createConnection(connectionOptions);
}

export default dbConnection;