import { Comment } from './../entities/Comment';
import { Post } from './../entities/Post';
import { User } from './../entities/User';
import { getRepository } from 'typeorm';
import { ResponseType } from '../types/ResponseType';
import { RequestType } from '../types/RequestType';

const commentControler = {
    // create Comment
    createComment: async (req: RequestType, res: ResponseType<Comment>) => {
        const { postID, content } = req.body;
        try {
            const user = await getRepository(User).findOne(req.userID);
            const post = await getRepository(Post).findOne(postID);
            if (post && user) {
                const newComment = new Comment();
                newComment.content = content;
                newComment.user = user;
                newComment.post = post;

                const comment = await getRepository(Comment).create(newComment);
                const newCommentDB = await getRepository(Comment).save(comment);

                if (newCommentDB) {
                    return res.status(200).json({
                        success: true,
                        data: newCommentDB
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'create comment fail!'
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    //get all comment of post
    getComment: async (req: RequestType, res: ResponseType<Comment>) => {
        try {
            const post = await getRepository(Post).findOne({postID : +req.params.postID});
            if (post) {
                const comment = await getRepository(Comment).find({
                    order: {
                        createAt: 'DESC',
                    },
                    where: {
                        post: post
                    },
                    relations: ['user']
                });
                if (comment) {
                    return res.status(200).json({
                        success: true,
                        data: comment
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'get comment fail!'
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // delete Comment
    deleteComment: async (req: RequestType, res: ResponseType<Comment>) => {
        const commentID = +req.params.commentID;
        try {
            const comment = await getRepository(Comment).delete({ commentID });
            if (comment) {
                return res.status(200).json({
                    success: true,
                    message: 'delete comment successfuly!'
                });
            }
            return res.status(400).json({
                success: false,
                message: 'delete comment not successfuly!'
            });
        } catch (error) {
            console.log(error);
        }
    }

};

export default commentControler;
