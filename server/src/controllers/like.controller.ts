import { getRepository } from 'typeorm';
import { ResponseType } from './../types/ResponseType';
import { RequestType } from './../types/RequestType';
import { Like } from '../entities/Like';
import { User } from '../entities/User';
import { Post } from '../entities/Post';

const likeController = {
    //like and unlike
    Like: async (req: RequestType, res: ResponseType<Like>) => {
        const { postID } = req.body;
        try {
            const user = await getRepository(User).findOne(req.userID);
            const post = await getRepository(Post).findOne(postID);
            if (user && post) {
                const like = await getRepository(Like).findOne({
                    where: {
                        user: user,
                        post: post
                    },
                });
                if (like) {
                    const deleteLike = await getRepository(Like).delete({ likeID: +like.likeID });
                    if (deleteLike) {
                        return res.status(200).json({
                            success: true,
                            message: 'delete like successfuly!'
                        });
                    }
                    return res.status(400).json({
                        success: false,
                        message: 'delete like not successfuly'
                    });
                } else {
                    const newLike = new Like();
                    newLike.isLike = true;
                    newLike.post = post;
                    newLike.user = user;
                    const addLike = await getRepository(Like).create(newLike);
                    const newLikeDB = await getRepository(Like).save(addLike);
                    if (newLikeDB) {
                        return res.status(200).json({
                            success: true,
                            data: newLikeDB
                        });
                    }
                    return res.status(400).json({
                        success: false,
                        message: 'fail!!!'
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    //get all likes of posts
    getLike: async (req: RequestType, res: ResponseType<Like>) => {
        const postID = req.params.postID;
        try {
            const post = await getRepository(Post).findOne(postID);
            if (post) {
                const like = await getRepository(Like).find({
                    where: {
                        post: post,
                    },
                    relations: ['user']
                });
                if (like) {
                    return res.status(200).json({
                        success: true,
                        data: like
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'Return failure!'
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export default likeController;
