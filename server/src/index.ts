import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { userRouter } from './routes/user';

const app = express();
app.use(json());
app.use(userRouter);

mongoose.connect('mongodb://localhost:27017/ledndb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'admin',
    pass: 'admin123'
}, (e) => {
    console.log(e);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})