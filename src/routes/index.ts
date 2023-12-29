import { Router } from 'express';
import { TodoRouter } from './todos';

export const Routes: Record<string, Router> = {
    todos: TodoRouter,
};
