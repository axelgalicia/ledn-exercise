import express, { Request, Response } from 'express';


const router = express.Router();

router.get('/api/users', (req: Request, res: Response) => {
    return res.send('The Users');
});

router.post('api/users',[], (req: Request, res: Response) => {
    return res.send('New user added');
});

export { router as userRouter }