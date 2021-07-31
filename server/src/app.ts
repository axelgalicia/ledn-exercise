import express, { Application } from 'express';
import { json } from 'body-parser';
import { userRouter } from './users/user.route';
import { ConnectToMongoDB } from './mongodb/connect';
import { Logger } from './logger/logger';
import { appConfig } from './app.config';

const app: Application = express();



app.use(json());
app.use(userRouter);


ConnectToMongoDB();

app.listen(appConfig.appPort, () => {
  Logger.info(`Server is listening on port ${appConfig.appPort}`);
})

process.on('SIGINT', function () {
  Logger.info('Kill signal received');
});