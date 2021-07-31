import mongoose from "mongoose"
import { Logger } from "../logger/logger";
import MongoConfig from './mongo.config';

const MONGOOSE_URL = `mongodb://${MongoConfig.MONGO_HOSTNAME}:${MongoConfig.MONGO_PORT}/${MongoConfig.MONGO_DB}?authSource=admin`;

const ConnectToMongoDB = () => {
    mongoose.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: MongoConfig.MONGO_USER,
        pass: MongoConfig.MONGO_PASSWORD
    }).then(() => {
        return Logger.info(`Connected to ${MongoConfig.MONGO_DB}`);
    }).catch(err => {
        Logger.error(`Could not connect to database :`, err);
        return process.exit(1);
    })
}

mongoose.connection.on("disconnected", ConnectToMongoDB);

export { ConnectToMongoDB }