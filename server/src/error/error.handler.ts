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

    public async handleError(error: any, response: Response, next: NextFunction): Promise<void> {
        await this.handleMongooseError(error, response, next);
        await this.handleValidationError(error, response, next);
        Logger.error(error);
    };

    private async handleMongooseError(error: any, response: Response, next: NextFunction): Promise<void> {

        if (this.isMongoError(error)) {
            const trackingCode = uuidv4();
            const responseError = this.getMongoErrorResponse(error, trackingCode);
            Logger.child({ trackingCode: trackingCode }).error(responseError);
            response.status(500).json(responseError);
        } else {
            next(error);
        }
    }

    private async handleValidationError(error: any, response: Response, next: NextFunction): Promise<void> {

        if (this.isValidationError(error)) {
            const trackingCode = uuidv4();
            const responseError = this.getValidationErrorResponse(error, trackingCode);
            Logger.child({ trackingCode: trackingCode }).error(responseError);
            response.status(500).json(responseError);
        } else {
            next(error);
        }
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


}

export const handler = new ErrorHandler();