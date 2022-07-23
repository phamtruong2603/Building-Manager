import { Server } from 'socket.io';

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

export const serverSocket = (server: any) => {

    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        }
    });

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
};
