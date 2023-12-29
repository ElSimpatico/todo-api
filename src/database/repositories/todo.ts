import {
    TodoConnector,
    TodoModel,
    TodoCreationAttributes,
} from '@database/models';

import { BaseRepository } from './base';

export class TodoRepository extends BaseRepository<TodoModel> {
    constructor() {
        super(TodoConnector);
    }

    public async findById(id: string): Promise<TodoModel | null> {
        return this.connector.findOne({
            where: {
                id,
            },
        });
    }

    public async saveTodo(todo: TodoCreationAttributes): Promise<TodoModel> {
        const newTodo = await this.connector.create(todo);
        return newTodo.save();
    }
}
