import { Post } from './../entities/Post';
import { NextFunction } from 'express';
import { RequestType } from '../types/RequestType';
import { getRepository } from 'typeorm';
import { ResponseType } from '../types/ResponseType';

const postRole = async (req: RequestType, res: ResponseType<Post>, next: NextFunction) => {
    try {
        const post = await getRepository(Post).findOne({
            select: ['postID'],
            where: {
                // postID: req.postID;
            }
        });

        if (post) {
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

export default postRole;