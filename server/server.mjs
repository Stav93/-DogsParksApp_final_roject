import express from 'express';
import "express-async-errors"
import morgan from 'morgan';
import bodyParser  from 'body-parser';
import { AppRouter } from './routes.mjs';
import "./db.mjs"

const port = 3001;
export const app = express();

app.listen(port);

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api', AppRouter);