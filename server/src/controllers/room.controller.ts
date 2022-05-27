import { User } from './../entities/User';
import { getRepository } from 'typeorm';
import { Room } from '../entities/Room';
import { ResponseType } from '../types/ResponseType';
import { RequestType } from '../types/RequestType';
import { Request } from 'express';

const roomController = {
    // get room for the user(GET: ../room/:roomID)
    getRoomDetail: async (req: RequestType, res: ResponseType<Room>) => {
        try {
            const room = await getRepository(Room).findOne({
                where: {
                    roomID: +req.params.roomID
                },
                relations: ['users']

            });
            if (room) {
                return res.status(200).json({
                    success: true,
                    data: room
                });
            }

            return res.status(404).json({
                success: false,
                message: 'Room not found !!!'
            });


        } catch (error) {
            console.log(error);
        }
    },
    //get all the rooms for admin(GET: .../room)
    getAllRoom: async (req: Request, res: ResponseType<Room>) => {
        try {
            const rooms = await getRepository(Room).find({
                select: ['roomID', 'roomName']
            });
            if (rooms) {
                return res.status(200).json({
                    success: true,
                    data: rooms
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Rooms not found !!!'
            });
        } catch (error) {
            console.log(error);
        }
    },
    // create room(POST .../room)
    createRoom: async (req: RequestType, res: ResponseType<Room>) => {
        const { roomName, rentPrice, haveWifi, isEmpty } = req.body;
        if (roomName === undefined) {
            return res.json({
                success: false,
                message: 'roomName is required'
            });
        }
        try {
            const checkRoom = await getRepository(Room).findOne({ roomName });
            if (checkRoom) {
                return res.json({
                    success: false,
                    message: 'This room is existed'
                });
            }

            const newRoom = new Room();

            newRoom.roomName = roomName;
            newRoom.rentPrice = rentPrice;
            newRoom.haveWifi = haveWifi;
            newRoom.isEmpty = isEmpty;

            const room = await getRepository(Room).create(newRoom);
            const newRoomDB = await getRepository(Room).save(room);

            if (newRoomDB) {
                return res.status(201).json({
                    success: true,
                    data: newRoom
                });
            }
            return res.status(400).json({
                success: false,
                message: 'create room fail!'
            });

        } catch (error) {
            console.log(error);
        }
    },
    //PUT: .../room/:id
    updateRoom: async (req: RequestType, res: ResponseType<Room>) => {
        try {
            const room = await getRepository(Room).findOne({ roomID: +req.params.id });
            if (room) {
                await getRepository(Room).merge(room, req.body);
                const newRoom = await getRepository(Room).save(room);
                if (newRoom) {
                    return res.status(200).json({
                        success: true,
                        data: newRoom
                    });
                }
            }
            return res.status(404).json({
                success: false,
                message: 'Room not found !!!'
            });

        } catch (error) {
            console.log(error);
        }
    },
    //delete room(DELETE: .../room/:id)
    deleteRoom: async (req: RequestType, res: ResponseType<Room>) => {
        const roomID = +req.params.id;
        try {
            const room = await getRepository(Room).findOne(roomID);
            if (room) {
                await getRepository(User).delete({ room: room });
                const deleteroom = await getRepository(Room).delete({ roomID });
                if (deleteroom) {
                    return res.status(203).json({
                        success: true,
                        message: 'This room deleted'
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'delete fail!'
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};

export default roomController;