import { Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { ErrorResponse, BaseResponse, ObjectResponse } from '@types';

export class JSONResponse {
    private static success(object: ObjectResponse): BaseResponse {
        const successResponse: BaseResponse = {
            success: true,
            data: object.data,
        };

        if (object.pagination) {
            successResponse.pagination = { ...object.pagination };
        }
        return successResponse;
    }

    private static error(error: ErrorResponse): BaseResponse {
        const errorResponse: BaseResponse = {
            success: false,
            data: null,
            error,
        };
        return errorResponse;
    }

    static ok(response: Response, object: ObjectResponse) {
        const jsonResponse = this.success(object);
        response.status(StatusCodes.OK).json(jsonResponse);
    }

    static created(response: Response, object: ObjectResponse) {
        const jsonResponse = this.success(object);
        response.status(StatusCodes.CREATED).json(jsonResponse);
    }

    static badRequest(response: Response, message?: string) {
        const errorCode = StatusCodes.BAD_REQUEST;
        const errorMessage = `${getReasonPhrase(errorCode)}. ${message}`;
        const jsonResponse = this.error({
            code: errorCode,
            message: errorMessage,
        });
        response.status(errorCode).json(jsonResponse);
    }

    static notFound(response: Response) {
        const errorCode = StatusCodes.NOT_FOUND;
        const jsonResponse = this.error({
            code: errorCode,
            message: getReasonPhrase(errorCode),
        });
        response.status(errorCode).json(jsonResponse);
    }

    static unprocessable(response: Response, message?: string) {
        const errorCode = StatusCodes.UNPROCESSABLE_ENTITY;
        const errorMessage = `${getReasonPhrase(errorCode)}. ${message}`;
        const jsonResponse = this.error({
            code: errorCode,
            message: errorMessage,
        });
        response.status(errorCode).json(jsonResponse);
    }

    static serverError(response: Response) {
        const errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
        const jsonResponse = this.error({
            code: errorCode,
            message: getReasonPhrase(errorCode),
        });
        response.status(errorCode).json(jsonResponse);
    }
}
