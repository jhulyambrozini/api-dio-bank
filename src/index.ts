import 'reflect-metadata';
import express from 'express';
import router from './routes';
import { AppDataSource } from './database';

const app = express();

app.use(express.json());

app.use(router);

app.listen(5000, () => console.log('Server is running'));
