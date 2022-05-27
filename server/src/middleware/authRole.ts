import { NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { RequestType } from '../types/RequestType';
import { ResponseType } from '../types/ResponseType';



const authRole = (role?: string) => {
    return async (req: RequestType, res: ResponseType<User>, next: NextFunction) => {
        try {
            if (role ? role === 'admin' ? true: false: false) {
                const user = await getRepository(User).findOne({userID: req.userID});
                if (user) {
                    if (user.isAdmin) {
                        next();
                        return res.status(200);
                    }  
                }
                return res.status(403).json({
                    success: false,
                    message: 'Not allowed !!!'
                });
            } 
            next();
        } catch (error) {
            console.log(error);
        }
    };
};

export default authRole;