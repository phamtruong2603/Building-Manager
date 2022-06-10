import { Like } from './../entities/Like';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import { ResponseType } from '../types/ResponseType';
import { RequestType } from '../types/RequestType';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';

const postController = {
    //create Post
    createPost: async (req: RequestType, res: ResponseType<Post>) => {
        const { content } = req.body;
        let url;
        req.file?.path ? url =
            req.protocol + '://' + req.get('host') + '/' + req.file?.path :
            url = '';
        try {
            const user = await getRepository(User).findOne(req.userID);
            if (user) {
                const newPost = new Post();
                newPost.content = content;
                newPost.postImg = url;
                newPost.user = user;
                const post = await getRepository(Post).create(newPost);
                const newPostDB = await getRepository(Post).save(post);
                if (newPostDB) {
                    return res.status(200).json({
                        success: true,
                        data: newPostDB
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'fail'
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    //get all Post
    getAllPost: async (req: RequestType, res: ResponseType<Post>) => {
        const take = req.body.take;
        const page = req.body.page * take;
        try {
            const posts = await getRepository(Post).find({
                order: {
                    createAt: 'DESC',
                },
                take: take,
                skip: page,
                relations: ['user', 'likes', 'comments']
            });
            if (posts) {
                return res.status(200).json({
                    success: true,
                    data: posts
                });
            }
            return res.status(400).json({
                success: false,
                message: 'fail'
            });
        } catch (error) {
            console.log(error);
        }
    },

    //delete Post
    deletePost: async (req: RequestType, res: ResponseType<Post>) => {
        try {
            const post = await getRepository(Post).findOne({
                select: ['user', 'postID'],
                where: {
                    postID: +req.params.postID
                },
                relations: ['user']
            });
            if (post && post.user.userID === req.userID) {
                await getRepository(Like).delete({ post: post });
                await getRepository(Comment).delete({ post: post });
                const deletepost = await getRepository(Post).delete({ postID: +req.params.postID });
                if (deletepost) {
                    return res.status(200).json({
                        success: true,
                        message: 'delete to post successfuly!'
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'You are not granted permission to delete'
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export default postController;
