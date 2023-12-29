import { query } from 'express-validator';

import { PAGINATION } from '@constants';

export const pagination = [
    query('page')
        .default(PAGINATION.DEFAULT_PAGE)
        .isInt({ gt: 0 })
        .withMessage('Page must be a number greater than 0'),
    query('limit')
        .default(PAGINATION.DEFAULT_LIMIT)
        .isInt({ gt: 0 })
        .withMessage('Limit must be a number greater than 0'),
];
