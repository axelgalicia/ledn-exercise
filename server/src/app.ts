import express, { Application } from 'express';
import { json } from 'body-parser';
import { userRouter } from './users/user.route';
import { ConnectToMongoDB } from './mongodb/connect';
import { Logger } from './logger/logger';
import AppConfig from './app.config';

const app: Application = express();
app.use(json());
app.use(userRouter);

ConnectToMongoDB();

app.listen(AppConfig.APP_PORT, () => {
    Logger.info(`Server is listening on port ${AppConfig.APP_PORT}`);
})

process.on('SIGINT', function() {
   Logger.info('Kill signal received');
 });