/**
 * LEDN API Server - Starts an Express JS API
 * which allows the user to query and insert Users
 * into and from a NoSQL database. (MongoDB)
 * 
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { userRouter } from './users/user.route';
import { ConnectToMongoDB } from './mongodb/connect';
import { Logger } from './logger/logger';

import { handler } from './error/error.handler';
import { appConfig } from './app.config';

const app: Application = express();


app.use(cors);
app.use(json());
app.use(userRouter);


ConnectToMongoDB();

app.listen(appConfig.appPort, () => {
  Logger.info(`Server is listening on port ${appConfig.appPort}`);
})

/**
 * 
 * Registers the global error handler
 * 
 * @param error The Error object
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function Callback
 * 
 */
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await handler.handleError(err, req, res, next);
});