import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { userRouter } from './routes/user';

const app = express();
app.use(json());
app.use(userRouter);

mongoose.connect('mongodb://localhost:27017/ledndb?authSource=admin', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'ledn_admin',
    pass: 'ledn_password'
}, (e) => {
    if (e) {
        console.log('Error to connect to MongoDB');
        console.error(e);
    }
    else {
        console.log('Connected to MongoDB');
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})