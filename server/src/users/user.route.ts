/**
 * @description Defines Express Route for User Model
 * @author Axel Galicia - axelgalicia@gmail.com
 */

import express, { NextFunction, Request, Response } from 'express';
import { Logger } from '../logger/logger';
import UserController from './user.controller';
import { User, UserDoc } from './user.model';


const router = express.Router();


/**
 * 
 * Gets all Users with filter options
 * 
 * GET /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function
 * 
 * @returns {UserDoc[]} Returns the list of all UserDoc[]
 * 
 */
router.get('/api/users', async (req: Request, res: Response, next: NextFunction) => {

    let users = null;
    try {
        users = await User.find({});
    } catch (e) {
        return res.status(500).send('User could not be saved');
    }

    return res.send(users);
});


/**
 * 
 * Inserts a new user
 * 
 * POST /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function
 * 
 * @returns {UserDoc} Returns the new UserDoc added
 * 
 */
router.post('/api/users', [], async (req: Request, res: Response, next: NextFunction) => {

    try {
        let user: UserDoc = await UserController.createUser(req.body);
        return res.status(200).send(user);
    } catch (error) {
        next(error);
    }

});


/**
 * Inserts an array of users
 * 
 * 
 * POST /api/users/bulk
 * 
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function
 * 
 * @returns {any}
 * 
 */
router.post('/api/users/bulk', [], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usersSaved = await UserController.insertBulkUsers(req.body);
        return res.status(200).send(usersSaved);
    } catch (error) {
        next(error);
    }
});

/**
 *  Deletes all users on the database
 * -- Testing purposes --
 * 
 * DELETE /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function
 * 
 * @returns {Void}
 * 
 */
router.delete('/api/users', [], async (req: Request, res: Response, next: NextFunction) => {
    try {
        Logger.info('Deleting all users..');
        await UserController.deleteAllUsers();
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});

export { router as userRouter }