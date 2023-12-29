import express, { Express, json } from 'express';
import { Routes } from '@routes';
import { Connection } from '@database';

export class Server {
    private app: Express;

    constructor() {
        this.app = express();
        this.configure();
    }

    private configure(): void {
        this.app.use(json());
        this.addRoutes();
    }

    private addRoutes(): void {
        Object.keys(Routes).forEach((resourceName: string) => {
            this.app.use(`/api/${resourceName}`, Routes[resourceName]);
        });
    }

    public async start(port: number): Promise<void> {
        try {
            await Connection.authenticate();
            await Connection.sync();
            console.log(
                'Database connection has been established successfully.'
            );
            this.app.listen(port, () => {
                console.log(`Server is listening on ${port}...`);
            });
        } catch (err) {
            console.error(err);
        }
    }
}
