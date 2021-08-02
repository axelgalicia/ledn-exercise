/**
 * @description Defines an Erron handler class to properly return formatted errors
 *              to the user.
 * @author Axel Galicia - axelgalicia@gmail.com
 */

import { Logger } from "../logger/logger";
import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';

interface IErrorResponse {
    type: string,
    details: any;
    trackingCode: string;
}

class ErrorHandler {

    public static readonly MONGO_ERROR = 'MongoError';
    public static readonly VALIDATION_ERROR = 'ValidationError';
    public static readonly GENERIC_ERROR = 'GenericError';


    /**
     * 
     * Handles all errors comming from next() call
     * 
     * @param error The Error object
     * @param req Http Request
     * @param res Http Response
     * @param next Next Function Callback
     * 
     */
    public async handleError(error: any, req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.handleMongooseError(error, res, next);
        await this.handleValidationError(error, res, next);
        await this.handleOtherError(error, res, next);
    };

    /**
     * 
     * Handles all errors matching MongoDB from next() call
     * 
     * @param error The Error object
     * @param res Http Response
     * @param next Next Function Callback
     * 
     */
    private async handleMongooseError(error: any, res: Response, next: NextFunction): Promise<void> {

        if (this.isMongoError(error)) {
            const trackingCode = uuidv4();
            const responseError = this.getMongoErrorResponse(error, trackingCode);
            Logger.child({ trackingCode: trackingCode }).error(responseError);
            res.status(500).json(responseError);
        } else {
            next(error);
        }
    }

    /**
     * 
     * Handles all errors matching ValidationError from Joi JS from next() call
     * 
     * @param error The Error object
     * @param res Http Response
     * @param next Next Function Callback
     * 
     */
    private async handleValidationError(error: any, res: Response, next: NextFunction): Promise<void> {

        if (this.isValidationError(error)) {
            const trackingCode = uuidv4();
            const responseError = this.getValidationErrorResponse(error, trackingCode);
            Logger.child({ trackingCode: trackingCode }).error(responseError);
            res.status(500).json(responseError);
        } else {
            next(error);
        }
    }

    /**
     * 
     * Handles all errors not handled from others handlers
     * 
     * @param error The Error object
     * @param res Http Response
     * @param next Next Function Callback
     * 
     */
    private async handleOtherError(error: any, res: Response, next: NextFunction): Promise<void> {
        const trackingCode = uuidv4();
        console.log('ERROR INSIDE HANDLER', error);
        const responseError = this.getGenericErrorResponse(error, trackingCode);
        Logger.child({ trackingCode: trackingCode }).error(responseError);
        res.status(500).json(responseError);
    }


    private containsName(error: any): boolean {
        return !!error.name;
    }

    private isMongoError(error: any): boolean {
        return this.containsName(error) && error.name === ErrorHandler.MONGO_ERROR;
    }

    private isValidationError(error: any): boolean {
        return this.containsName(error) && error.name === ErrorHandler.VALIDATION_ERROR;
    }


    private getValidationErrorResponse(error: any, trackingCode: string): IErrorResponse {
        const errorResponse: IErrorResponse = {
            type: ErrorHandler.VALIDATION_ERROR,
            details: error.details,
            trackingCode,
        }
        return errorResponse;
    }

    private getMongoErrorResponse(error: any, trackingCode: string): IErrorResponse {
        const errorResponse: IErrorResponse = {
            type: ErrorHandler.MONGO_ERROR,
            details: {
                message: 'Error in MongoDB',
                detail: error.message
            },
            trackingCode,
        }
        return errorResponse;
    }


    private getGenericErrorResponse(error: any, trackingCode: string): IErrorResponse {
        const errorResponse: IErrorResponse = {
            type: ErrorHandler.GENERIC_ERROR,
            details: {
                message: 'Generic error',
                detail: error.message
            },
            trackingCode,
        }
        return errorResponse;
    }


}

export const handler = new ErrorHandler();