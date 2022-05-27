
import { NextFunction } from 'express';
import { RequestType } from '../types/RequestType';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { ResponseType } from '../types/ResponseType';

const roomRole = async (req: RequestType, res: ResponseType<User>, next: NextFunction) => {
    try {
        const user = await getRepository(User).findOne({
            select: ['userID', 'isAdmin'],
            where: {
                userID: req.userID
            },
            relations: ['room']
        });

        if (user?.isAdmin || user?.room?.roomID === +req.params.roomID) {
            next();
        } else {
            return res.status(404).json({
                success: false,
                message: 'Not allowed !!!'
            });
        }

    } catch (error) {
        console.log(error);
    }
};

export default roomRole;