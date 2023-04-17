import express from 'express';
import "express-async-errors"
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { AppRouter } from './routes.mjs';
import * as path from "path";
// import  connectDB  from"./db.mjs"
import "./db.mjs"
import { fileURLToPath } from 'url';


const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.listen(port);
// connectDB();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static("../client/build"))

app.use('/api', AppRouter);

app.get('*/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})