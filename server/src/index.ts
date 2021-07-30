import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { userRouter } from './routes/user';

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_USER = process.env.MONGO_USER || 'ledn_admin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'ledn_password'
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost';
const MONGO_PORT = process.env.MONGO_HOSTNAME || '27017';
const MONGO_DB = process.env.MONGO_DB || 'ledndb';

const MONGOOSE_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const app = express();
app.use(json());
app.use(userRouter);

mongoose.connect(MONGOOSE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: MONGO_USER,
    pass: MONGO_PASSWORD
}, (e) => {
    if (e) {
        console.log('Error to connect to MongoDB');
        console.error(e);
    }
    else {
        console.log('Connected to MongoDB');
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})