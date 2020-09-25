import express from 'express';
import { dbConnection } from './models/db'

const app = express();
const port = 8080;

dbConnection();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});