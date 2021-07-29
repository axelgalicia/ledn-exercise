import express, { Request, Response } from 'express';
import { User } from '../models/user';


const router = express.Router();

router.get('/api/users', async (req: Request, res: Response) => {

    let users = null;
    try {
        users = await User.find({});
    } catch (e) {
        console.log(e);
        return res.status(500).send('User could not be saved');
    }

    return res.send(users);
});

router.post('/api/users', [], async (req: Request, res: Response) => {

    console.log('post save user');

    const { firstName, lastName } = req.body;

    try {
        const user = User.build({
            firstName,
            lastName,
            countryCode: 'MX',
            email: 'axelmania@gmail.com',
            dob: new Date(), mfa: 'aaa',
            amt: 12345,
            createdDate: new Date(),
            referredBy: 'Ledn Team'
        });

        await user.save().catch(e => {
            console.error(e);
        });

    } catch (ee) {
        console.log('could not save', ee);
    }
    return res.status(201).send('New user added');
});

export { router as userRouter }