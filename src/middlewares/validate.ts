import { Request, Response, NextFunction } from 'express';
import { ContextRunner, validationResult } from 'express-validator';

import { JSONResponse } from '@utils';

export const validate =
    (validations: ContextRunner[]) =>
    async (request: Request, response: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(request);
            if (result.array().length > 0) {
                break;
            }
        }
        const errors = validationResult(request);
        if (errors.isEmpty()) {
            return next();
        }
        const errorMessage = errors.array()[0].msg;
        JSONResponse.unprocessable(response, errorMessage);
    };
