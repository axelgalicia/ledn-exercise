import mongoose from "mongoose"
import { Logger } from "../logger/logger";

const MONGO_USER = process.env.LEDN_MONGO_USER ;
const MONGO_PASSWORD = process.env.LEDN_MONGO_PASSWORD;
const MONGO_HOSTNAME = process.env.LEDN_MONGO_HOSTNAME;
const MONGO_PORT = process.env.LEDN_MONGO_PORT;
const MONGO_DB = process.env.LEDN_MONGO_DB;

const MONGOOSE_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const ConnectToMongoDB = () => {
    mongoose.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: MONGO_USER,
        pass: MONGO_PASSWORD
    }).then(() => {
        return Logger.info(`Connected to ${MONGO_DB}`);
    }).catch(err => {
        Logger.error(`Could not connect to database :`, err);
        return process.exit(1);
    })
}

mongoose.connection.on("disconnected", ConnectToMongoDB);

export { ConnectToMongoDB }