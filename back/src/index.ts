import 'reflect-metadata';
import Container from 'typedi';
import { Application } from './Application';

const app = Container.get(Application);

app.start();