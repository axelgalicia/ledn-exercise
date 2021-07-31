import mongoose from "mongoose"
import { Logger } from "../logger/logger";
import { mongoConfig } from './mongodb.config';

const ConnectToMongoDB = () => {
    const MONGOOSE_URL = `mongodb://${mongoConfig.hostname}:${mongoConfig.port}/${mongoConfig.db}?authSource=admin`;
    mongoose.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongoConfig.user,
        pass: mongoConfig.password
    }).then(() => {
        return Logger.info(`Connected to ${mongoConfig.db}`);
    }).catch(err => {
        Logger.error(`Could not connect to database :`, err);
        return process.exit(1);
    })
}

mongoose.connection.on("disconnected", ConnectToMongoDB);

export { ConnectToMongoDB }