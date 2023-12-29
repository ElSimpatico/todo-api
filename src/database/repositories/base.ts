import {
    ModelStatic,
    Model,
    FindOptions,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';

import { Pagination } from '@types';

export abstract class BaseRepository<T extends Model> {
    protected connector: ModelStatic<T>;

    constructor(connector: ModelStatic<T>) {
        this.connector = connector;
    }

    private async getPagination(
        page: number,
        limit: number
    ): Promise<Pagination> {
        const total = await this.connector.count();
        const totalPages = Math.ceil(total / limit);
        const nextPage = page + 1;
        const previousPage = page - 1;
        return {
            total,
            currentPage: page,
            totalPages,
            nextPage: nextPage <= totalPages ? nextPage : null,
            previousPage: previousPage > 0 ? previousPage : null,
        };
    }

    private async paginateResults(
        page: number,
        limitTo: number,
        options?: FindOptions
    ): Promise<Model<InferAttributes<T>, InferCreationAttributes<T>>[]> {
        const offset = (page - 1) * limitTo;
        return this.connector.findAll({
            ...options,
            offset,
            limit: limitTo,
        });
    }

    public async getAll(
        options?: FindOptions
    ): Promise<Model<InferAttributes<T>, InferCreationAttributes<T>>[]> {
        return this.connector.findAll({ ...options });
    }

    public async getCount(options?: FindOptions): Promise<number> {
        return this.connector.count({ ...options });
    }

    public async paginate(
        page: number,
        limit: number,
        options?: FindOptions
    ): Promise<{
        models: Model<InferAttributes<T>, InferCreationAttributes<T>>[];
        pagination: Pagination;
    }> {
        const paginationPromise = this.getPagination(page, limit);
        const models = await this.paginateResults(page, limit, options);
        const pagination = await paginationPromise;

        return {
            models,
            pagination,
        };
    }
}
