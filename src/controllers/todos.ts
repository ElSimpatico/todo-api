import { Request, Response } from 'express';

import { TodoAttributes } from '@database/models';
import { TodoRepository } from '@database/repositories';
import { JSONResponse } from '@utils';

export class TodosController {
    private static repository: TodoRepository = new TodoRepository();

    static async getAll(request: Request, response: Response) {
        const { page, limit } = request.query;
        try {
            const { models, pagination } =
                await TodosController.repository.paginate(
                    Number(page),
                    Number(limit)
                );

            const todos: TodoAttributes[] = models.map(
                (model) => model.dataValues
            );
            JSONResponse.ok(response, {
                data: todos,
                pagination,
            });
        } catch (err) {
            console.error(err);
            JSONResponse.serverError(response);
        }
    }

    static async getTodo(request: Request, response: Response) {
        const { id } = request.params;
        try {
            const todo = await TodosController.repository.findById(id);
            if (todo) {
                return JSONResponse.ok(response, { data: todo.dataValues });
            }
            JSONResponse.notFound(response);
        } catch (err) {
            console.error(err);
            JSONResponse.serverError(response);
        }
    }

    static async addTodo(request: Request, response: Response) {
        const { name, completed } = request.body;
        try {
            const todo = await TodosController.repository.saveTodo({
                name,
                completed,
            });
            return JSONResponse.created(response, { data: todo.dataValues });
        } catch (err) {
            console.error(err);
            JSONResponse.serverError(response);
        }
    }

    static async updateTodo(request: Request, response: Response) {
        const { id } = request.params;
        const { name, completed } = request.body;
        try {
            const todo = await TodosController.repository.findById(id);
            if (todo) {
                await todo.update({
                    name,
                    completed,
                });
                return JSONResponse.ok(response, { data: todo.dataValues });
            }
            JSONResponse.notFound(response);
        } catch (err) {
            console.error(err);
            JSONResponse.serverError(response);
        }
    }

    static async deleteTodo(request: Request, response: Response) {
        const { id } = request.params;
        try {
            const todo = await TodosController.repository.findById(id);
            if (todo) {
                await todo.destroy();
                return JSONResponse.ok(response, { data: todo.dataValues });
            }
            JSONResponse.notFound(response);
        } catch (err) {
            console.error(err);
            JSONResponse.serverError(response);
        }
    }
}
