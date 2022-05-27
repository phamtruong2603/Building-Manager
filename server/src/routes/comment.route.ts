import express from 'express';
import authVerifyToken from '../middleware/authVerifyToken';
import commentControler from '../controllers/comment.controller';

const commentRoute = express.Router();

commentRoute.use(authVerifyToken);
commentRoute.post('/', commentControler.createComment);
commentRoute.get('/getComment/:postID', commentControler.getComment);
commentRoute.delete('/:commentID', commentControler.deleteComment);

export default commentRoute;
