import { Conversation } from '../entities/Conversation';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import { Message } from '../entities/Message';
import { ResponseType } from '../types/ResponseType';
import { RequestType } from '../types/RequestType';
const messageController = {
    //create message
    createMessage: async (req: RequestType, res: ResponseType<Message | Conversation>) => {
        const { message, conversationID } = req.body;
        const user = await getRepository(User).findOne(req.userID);
        const conversation = await getRepository(Conversation).findOne(conversationID);
        try {
            if (user && conversation) {
                const newMessage = new Message();
                newMessage.message = message;
                newMessage.users = user;
                newMessage.conversation = conversation;
                const addMessage = await getRepository(Message).create(newMessage);
                const newMessageDB = await getRepository(Message).save(addMessage);
                if (newMessageDB) {
                    return res.status(400).json({
                        success: true,
                        data: newMessageDB
                    });
                }
                return res.status(200).json({
                    success: false,
                    message: 'fail!!!'
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    //get message by conversation
    getMessage: async (req: RequestType, res: ResponseType<Message>) => {
        const { conversationID } = req.body;
        try {
            const conversation = await getRepository(Conversation).findOne(conversationID);
            const mess = await getRepository(Message).find({
                select: ['messageID', 'message'],
                where: {
                    conversation
                },
                relations: ['users']
            });
            if (mess) {
                return res.status(200).json({
                    success: true,
                    data: mess,
                });
            }
            return res.status(400).json({
                success: false,
                message: 'fail!!!'
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export default messageController;
