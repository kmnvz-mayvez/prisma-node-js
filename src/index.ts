import express, { Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { json } from 'body-parser';

import { userRouter } from './routes/users';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';

const app = express();
dotenv.config()

app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hi there');
});

app.use(userRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})


