import express from 'express';
import stolenBikesRouter from './api/stolen-bikes';
import bodyParser from 'body-parser';
import { errorMiddleware } from './exceptions';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(stolenBikesRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
