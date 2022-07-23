import { getRepository, In } from 'typeorm';
import { ResponseType } from './../types/ResponseType';
import { RequestType } from './../types/RequestType';
import { User } from '../entities/User';
import { Conversation } from '../entities/Conversation';

const conversationController = {
    //create conversation
    createConversation: async (req: RequestType, res: ResponseType<Conversation>) => {
        const { userID } = req.body;
        const usersChat = await getRepository(User).find({
            where: { userID: In(userID) },
        });
        try {
            if (usersChat) {
                const newConversation = new Conversation();
                newConversation.users = [...usersChat];
                const addConversation = await getRepository(Conversation).create(newConversation);
                const newConversationDB = await getRepository(Conversation).save(addConversation);
                if (newConversationDB) {
                    return res.status(400).json({
                        success: true,
                        data: newConversationDB
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    //get all user in conversation
    getConversation: async (req: RequestType, res: ResponseType<User | Conversation>) => {
        const user = await getRepository(User).findOne(req.userID);
        try {
            const conversation = await user?.conversations;
            if (conversation) {
                return res.status(200).json({
                    success: true,
                    data: conversation
                });
            }
            return res.status(400).json({
                success: false,
                message: 'fail!!!'
            });
        } catch (error) {
            console.log(error);
        }
    },
    //update name conversation
    putConversation: async (req: RequestType, res: ResponseType<Conversation>) => {
        const { conversationID } = req.body;
        try {
            const conversation = await getRepository(Conversation).findOne(conversationID);
            if (conversation) {
                const updateConversation: Conversation = { ...conversation, ...req.body };
                const newConversation = await getRepository(Conversation).save(updateConversation);
                if (newConversation) {
                    return res.status(200).json({
                        success: true,
                        data: newConversation
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'fall!!!'
                });
            }

        } catch (error) {
            console.log(error);
        }
    },

};

export default conversationController;
