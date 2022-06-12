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
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['POST', 'GET', 'PUT', 'DELETE']
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(path.join(process.cwd(), 'public')));

route(app);
interface User {
    userID: number,
    socketID: string
}

let usersOnSocket: User[] = [];

const addUser = (userID: number, socketID: string) => {
    usersOnSocket = usersOnSocket.filter((ur) => {
        // return userID && ur.userID !== userID;
        return ur.userID !== userID;
    });

    usersOnSocket.push({ userID, socketID });
};

const checkUser = (userID: number) => {
    return usersOnSocket.find((ur) => ur.userID === userID);
};

const disConnectUser = (socketID: string) => {
    usersOnSocket = usersOnSocket.filter(user => user.socketID !== socketID);
};

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        const user: User = checkUser(data.userID) || { userID: -1, socketID: '' };
        io.to(`${user.socketID}`).emit('pushMessage', data);
    });

    socket.on('newConnectUser', (data) => {
        addUser(data, socket.id);
        console.log(usersOnSocket);
    });

    socket.on('notificationClientPush', (data) => {
        console.log(data);
        io.to(checkUser(data.userID)?.socketID || 'nn').emit('notificationServerPush', data);
    });

    socket.on('logOut', () => {
        disConnectUser(socket.id);
    });

    socket.on('disconnect', () => {
        disConnectUser(socket.id);
    });
});

const PORT = parseInt(process.env.SERVER_PORT as string) || 6969;

server.listen(PORT, () => console.log(`server is runing in port ${PORT}`));
