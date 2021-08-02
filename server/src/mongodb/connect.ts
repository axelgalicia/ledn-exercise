/**
 * Contains methods to create MongoDB connection
 * using Mongoose JS Library.
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */


import mongoose from "mongoose"
import { Logger } from "../logger/logger";
import { mongoDBConfig } from './mongodb.config';

/**
 * Connects to MongoDB instace based on environment variables
 * gathered by mongoDBConfig
 *
 * @return {void}
 */
const ConnectToMongoDB = (): void => {
    const MONGOOSE_URL = `mongodb://${mongoDBConfig.hostname}:${mongoDBConfig.port}/${mongoDBConfig.db}?authSource=admin`;
    mongoose.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongoDBConfig.user,
        pass: mongoDBConfig.password
    }).then(() => {
        return Logger.info(`Connected to ${mongoDBConfig.db}`);
    }).catch(err => {
        Logger.error(`Could not connect to database :`, err);
        return process.exit(1);
    })
}

mongoose.connection.on("disconnected", ConnectToMongoDB);

export { ConnectToMongoDB }