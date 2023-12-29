import { body } from 'express-validator';

export const add = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    body('completed')
        .isBoolean()
        .withMessage('Completed must be a boolean')
        .optional(),
];

export const update = [
    body('name').isString().withMessage('Name must be a string').optional(),
    body('completed')
        .isBoolean()
        .withMessage('Completed must be a boolean')
        .optional(),
];
