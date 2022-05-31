import { Notification } from '../entities/Notification';
import { getRepository } from 'typeorm';
import { ResponseType } from '../types/ResponseType';
import { RequestType } from '../types/RequestType';
import { User } from '../entities/User';
import { Post } from '../entities/Post';

const notificationController = {
    postNoti: async (req: RequestType, res: ResponseType<Notification>) => {
        const { content, postID, userID } = req.body;
        try {
            const user = await getRepository(User).findOne(userID);
            const post = await getRepository(Post).findOne(postID);

            if (post && user) {
                const noti = await getRepository(Notification).findOne({
                    select : ['notificationID'],
                    where: {
                        user: user,
                        post: post,
                        content: content
                    }
                });
                if (noti) {
                    await getRepository(Notification).delete({ notificationID: +noti.notificationID });
                } else {
                    const newNoti = new Notification();
                    newNoti.content = content;
                    newNoti.post = post;
                    newNoti.user = user;

                    const addNoti = await getRepository(Notification).create(newNoti);
                    const newNotiDB = await getRepository(Notification).save(addNoti);

                    if (!newNotiDB) {
                        return res.status(400).json({
                            success: false,
                            message: 'Notification Fail !!!'
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        data: newNotiDB
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    updateNoti: async (req: RequestType, res: ResponseType<Notification>) => {
        console.log(+req.params.notiID);
        try {
            const noti = await getRepository(Notification).findOne({
                where: {
                    notificationID: +req.params.notiID
                },
                relations: ['user', 'post']
            });
            console.log(noti);
            if (noti) {
                const detailNoti: Notification = { ...noti, seen: true };
                const newNotiDB = await getRepository(Notification).save(detailNoti);
                if (newNotiDB) {
                    return res.status(200).json({
                        success: true,
                        message: 'update successful',
                        data: newNotiDB
                    });
                }
            }
            return res.status(400).json({
                success: true,
                message: 'update fail!!!',
            });
        } catch (error) {
            console.log(error);
        }
    },
    getNoti: async (req: RequestType, res: ResponseType<Notification>) => {
        const userID = req.userID;
        try {
            const user = await getRepository(User).findOne(userID);

            if (user) {
                const Noti = await getRepository(Notification).find({
                    where: {
                        user: {
                            userID: req.userID
                        }
                    },
                    order: { 'createAt': 'DESC' },
                    relations: ['post', 'user']
                });

                if (!Noti) {
                    return res.status(400).json({
                        success: false,
                        message: 'Notification Fail !!!'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: Noti
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

};

export default notificationController;
