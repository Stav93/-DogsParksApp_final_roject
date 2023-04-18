import express from 'express';
import "express-async-errors"
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
// import dotenv from "dotenv";
import { AppRouter } from './routes.mjs';
import * as path from "path";
import "./db.mjs"



const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.listen(port);
// dotenv.config();

app.use(morgan('combined'));
app.use(bodyParser.json());
// app.use(express.static("./build/index.html"))
app.use(express.static("../client/build"))

app.use('/api', AppRouter);

// app.get('*/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build/index.html'))
// })
app.get('*/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})