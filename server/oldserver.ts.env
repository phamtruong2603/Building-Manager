import dotenv from 'dotenv';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import connectDB from './src/db/connectDB';
import route from './src/routes';
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

    //user login and go online
    socket.on('newConnectUser', (data) => {
        addUser(data, socket.id);
    });

    //chat realtime
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('message', (data) => {
        console.log(data);
        io.to(data.room).emit('pushMessage', data);
    });

    // notification
    socket.on('notificationClientPush', (data) => {
        io.to(checkUser(data.userID)?.socketID || 'nn').emit('notificationServerPush', data);
    });

    //user log out and go offline
    socket.on('logOut', () => {
        disConnectUser(socket.id);
    });

    socket.on('disconnect', () => {
        disConnectUser(socket.id);
    });
});

const PORT = parseInt(process.env.SERVER_PORT as string) || 6868;

server.listen(PORT, () => console.log(`server is runing in port ${PORT}`));
