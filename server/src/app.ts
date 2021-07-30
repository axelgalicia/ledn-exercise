import express, { Application } from 'express';
import { json } from 'body-parser';
import { userRouter } from './users/user.route';
import { ConnectToMongoDB } from './mongodb/connect';
import { Logger } from './logger/logger';


const PORT = process.env.LEDN_PORT;

const app: Application = express();
app.use(json());
app.use(userRouter);

ConnectToMongoDB();

app.listen(PORT, () => {
    Logger.info(`Server is listening on port ${PORT}`);
})

process.on('SIGINT', function() {
   Logger.info('Kill signal received');
 });