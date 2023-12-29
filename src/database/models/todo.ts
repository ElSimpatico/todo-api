import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { Connection } from '@database';

export type TodoAttributes = InferAttributes<TodoModel>;
export type TodoCreationAttributes = InferCreationAttributes<
    TodoModel,
    { omit: 'id' }
>;

export interface TodoModel
    extends Model<TodoAttributes, TodoCreationAttributes> {
    id: string;
    name: string;
    completed: boolean;
}

export const TodoConnector = Connection.define<TodoModel>(
    'Todo',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
        },
    },
    { tableName: 'todos', timestamps: false }
);
