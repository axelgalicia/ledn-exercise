import express, { Request, Response } from 'express';
import { Logger } from '../logger/logger';
import UserController from './user.controller';
import { User, UserDoc } from './user.model';


const router = express.Router();


/**
 * 
 * GET /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @Return Returns the list of all UserDoc[]
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
 * @Return Returns the new UserDoc added
 * 
 */
router.post('/api/users', [], async (req: Request, res: Response) => {
    let user: UserDoc = new User();
    try {
        user = await UserController.CreateUser(req.body);
    } catch (e) {
        Logger.error('Error to save new user :', e);
        return res.status(500).send(e);
    }
    Logger.info('New user saved');
    return res.status(200).send(user);
});


/**
 * 
 * POST /api/users/bulk
 * 
 * @param req Http Request
 * @param res Http Response
 * @Return UserDoc[]
 * 
 */
// router.post('/api/users/bulk', [], async (req: Request, res: Response) => {
//     console.log('POST: save users bulk');
//     let users: UserDoc[] = [];
//     let usersSaved: any;
//     try {
//         users = User.buildFromBulkRequest(req.body);
//         usersSaved = await User.insertMany(users, { ordered: false });

//     } catch (e) {
//         console.error(e);
//         return res.status(500).send(e);
//     }
//     return res.status(200).send(usersSaved);
// });

/**
 * 
 * -- Testing purposes --
 * 
 * DELETE /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @Return 201
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