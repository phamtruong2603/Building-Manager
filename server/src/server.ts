import dotenv from 'dotenv';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import connectDB from './db/connectDB';
import route from './routes';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
connectDB();
const app: Application = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(path.join(process.cwd(), 'public')));

route(app);

const PORT = parseInt(process.env.SERVER_PORT as string) || 6969;

io.on('connection', () => {
    console.log('a user connected');
});

server.listen(PORT, () => console.log(`server is runing in port ${PORT}`));
