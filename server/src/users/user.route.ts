/**
 * Defines Express Route for User Model
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import express, { NextFunction, Request, Response } from 'express';
import UserController from './user.controller';
import { UserDoc } from './user.model';


const router = express.Router();


/**
 * 
 * Gets statistics for all users
 * 
 * GET /api/users/statistics
 * 
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function
 * @returns {IUserStatistics} Returns User collection statistics
 * 
 */
 router.get('/api/users/statistics', async (req: Request, res: Response, next: NextFunction) => {

    let statistics = null;
    try {
        statistics = await UserController.findUserStatisctics();
        return res.send(statistics);
    } catch (error) {
        next(error);
    }
});


/**
 * 
 * Gets all Users with filter options
 * 
 * GET /api/users
 * 
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function
 * @returns {UserDoc[]} Returns the list of all UserDoc[]
 * 
 */
router.get('/api/users', async (req: Request, res: Response, next: NextFunction) => {

    let users = null;
    try {
        users = await UserController.findAllUsers(req.query);
        return res.send(users);
    } catch (error) {
        next(error);
    }
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
 * @returns {Void}
 * 
 */
router.delete('/api/users', [], async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UserController.deleteAllUsers();
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});


/**
 * 
 * Starts loading the data contained in /opt/data
 * 
 * -- Testing purposes --
 * 
 * GET /api/users/autoload
 * 
 * @param req Http Request
 * @param res Http Response
 * @param next Next Function
 * @returns {UserDoc[]} Returns the list of all UserDoc[]
 * 
 */
 router.get('/api/users/autoload', async (req: Request, res: Response, next: NextFunction) => {

    let inserted = null;
    try {
        inserted = await UserController.loadData();
        return res.send(inserted);
    } catch (error) {
        next(error);
    }
});




export { router as userRouter }