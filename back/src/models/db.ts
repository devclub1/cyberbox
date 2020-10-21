import Container from 'typedi';
import { ConnectionOptions, getConnectionOptions, createConnection, useContainer } from 'typeorm';

export default async function establishDbConnection() {
    useContainer(Container);

    const connectionOptions: ConnectionOptions = await getConnectionOptions();
    return await createConnection(connectionOptions);
}