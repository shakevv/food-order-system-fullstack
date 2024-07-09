import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exception/exception";


const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);

    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: err.message });
    }
};

export const asyncHandler = (fn: any) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise
            .resolve(fn(req, res, next))
            .catch(next);


export { errorHandler };