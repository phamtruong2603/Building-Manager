import express from 'express';
import authVerifyToken from '../middleware/authVerifyToken';
import likeController from '../controllers/like.controller';

const likeRoute = express.Router();

likeRoute.use(authVerifyToken);
likeRoute.post('/', likeController.Like);
likeRoute.get('/getLike/:postID', likeController.getLike);

export default likeRoute;