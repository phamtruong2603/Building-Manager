import express from 'express';
import authVerifyToken from '../middleware/authVerifyToken';
import postController from '../controllers/post.controller';
import multer from 'multer';

const upload = multer({
    dest: './public/image/post',
});
const postRoute = express.Router();

postRoute.use(authVerifyToken);
postRoute.post('/createPost',
    upload.single('postImg'),
    postController.createPost
);
postRoute.post('/getAllPost', postController.getAllPost);
postRoute.delete('/deletePost/:postID', postController.deletePost);


export default postRoute;