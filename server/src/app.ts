import express, { Application, Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { userRouter } from './users/user.route';
import { ConnectToMongoDB } from './mongodb/connect';
import { Logger } from './logger/logger';

import  { handler }  from './error/error.handler';
import { appConfig } from './app.config';

const app: Application = express();



app.use(json());
app.use(userRouter);


ConnectToMongoDB();

app.listen(appConfig.appPort, () => {
  Logger.info(`Server is listening on port ${appConfig.appPort}`);
})


app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await handler.handleError(err, res, next);
});