import * as express from 'express';
import * as util from 'util';
import {
    StatusCodes,
} from 'http-status-codes';
import logger from '../utils/logger';
import HttpError from '../utils/error';

const customErrorHandler = (
    err: Error, 
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void => {
    if (err instanceof HttpError) {
        let body: any = {
            message: err.message || 'An error occurred during the request.',
            name: err.name,
            status: err.statusCode,
            stack: err.stack,
        };
        res.status(err.statusCode).json(body);
    }else{
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
    // since err's type is Error, it caught all the errors
    // next();
};

export default customErrorHandler;