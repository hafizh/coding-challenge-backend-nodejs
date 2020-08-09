import { Request, Response, NextFunction } from 'express';

export class StolenBikeCaseNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StolenBikeCaseNotFound";
    }
}

export const errorMiddleware = (err: Error, _: Request, res: Response, next: NextFunction) => {
    if (err instanceof StolenBikeCaseNotFound) {
        res.status(404).send({error: err.message})
    } else {
        next(err)
    }
}