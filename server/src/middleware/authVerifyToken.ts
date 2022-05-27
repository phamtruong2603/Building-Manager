import { NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { RequestType } from '../types/RequestType';
import { TokenType } from '../types/TokenType';
import { User } from '../entities/User';
import { ResponseType } from '../types/ResponseType';

const authVerifyToken = async (req : RequestType, res: ResponseType<User>, next: NextFunction) => {
    const headerDate = req.headers.authorization;
    const token = headerDate && headerDate.split(' ')[1];

    try {
        if (token) {
            const decoden = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as TokenType;
            if (decoden) {
                req.userID = decoden.id;
                next();
            }
        } else {
            return res.status(403).json({
                success: false,
                message: 'Not allowed !!!'
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export default authVerifyToken;