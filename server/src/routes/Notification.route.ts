import express from 'express';
import authVerifyToken from '../middleware/authVerifyToken';
import notificationController from '../controllers/notification.controller';

const NotiRoute = express.Router();

NotiRoute.put('/:notiID' , notificationController.updateNoti);

NotiRoute.use(authVerifyToken);
NotiRoute.get('/' , notificationController.getNoti);
NotiRoute.post('/' , notificationController.postNoti);

export default NotiRoute;
