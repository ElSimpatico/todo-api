import 'dotenv/config';
import { Server } from './src/server';

const port = Number(process.env.PORT) || 5000;

const server = new Server();

server.start(port);
