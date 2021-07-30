import express, { Request, Response } from 'express';
import { User, UserDoc } from '../models/user';


const router = express.Router();


/**
 * 
 * GET /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @Return Returns the list of all users
 * 
 */
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


/**
 * 
 * POST /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @Return Returns the new user added
 * 
 */
router.post('/api/users', [], async (req: Request, res: Response) => {
    console.log('POST: save user');
    let user: UserDoc = new User();
    try {
        user = User.buildFromRequest(req.body);
        await User.create(user);
    } catch (e) {
        console.error(e);
        return res.status(400).send(e);
    }
    return res.status(200).send(user);
});


/**
 * 
 * POST /api/users/bulk
 * 
 * @param req Http Request
 * @param res Http Response
 * @Return Empty 201 on Success
 * 
 */
 router.post('/api/users', [], async (req: Request, res: Response) => {
    console.log('POST: save user');
    let user: UserDoc = new User();
    try {
        user = User.buildFromRequest(req.body);
        await User.create(user);
    } catch (e) {
        console.error(e);
        return res.status(400).send(e);
    }
    return res.status(200).send(user);
});

/**
 * 
 * -- Testing purposes --
 * 
 * DELETE /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @Return Returns t
 * 
 */
router.delete('/api/users', [], async (req: Request, res: Response) => {

    console.log('Deleting all users');
    try {
        await User.deleteMany();
    }
    catch (e) {
        console.log('could not delete', e);
    }
    return res.status(201).send('All Users deleted');
});

export { router as userRouter }