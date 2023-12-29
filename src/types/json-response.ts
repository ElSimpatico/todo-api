import { Pagination } from './pagination';

export interface ErrorResponse {
    code: number;
    message: string;
}

export interface ObjectResponse {
    data: unknown;
    pagination?: Pagination;
}

export interface BaseResponse extends ObjectResponse {
    success: boolean;
    error?: ErrorResponse;
}
