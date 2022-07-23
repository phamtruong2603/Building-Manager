import { Application, NextFunction, Request, Response } from 'express';
import routeUser from './user.route';
import routeRoom from './room.route';
import routeBill from './bill.route';
import routePost from './post.route';
import likeRoute from './like.route';
import commentRoute from './comment.route';
import NotiRoute from './Notification.route';
import chatRoute from './chat.rouse';

const route = (app: Application) => {
    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use('/chat', chatRoute);
    app.use('/notification', NotiRoute);
    app.use('/comment', commentRoute);
    app.use('/like', likeRoute);
    app.use('/post', routePost);
    app.use('/bill', routeBill);
    app.use('/room', routeRoom);
    app.use('/', routeUser);
};

export default route;
