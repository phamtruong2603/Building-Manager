import express from 'express';
import authVerifyToken from '../middleware/authVerifyToken';
import roomRole from '../middleware/roomRole';
import messageController from '../controllers/Message.controller';
import conversationController from '../controllers/conversation.controller';

const chatRoute = express.Router();

chatRoute.use(authVerifyToken);
chatRoute.post('/conversation/Create', roomRole, conversationController.createConversation);
chatRoute.get('/conversation/getAll', roomRole, conversationController.getConversation);
chatRoute.post('/conversation/users', roomRole, conversationController.getUser);
chatRoute.put('/conversation/update', roomRole, conversationController.putConversation);
chatRoute.post('/message/Create', roomRole, messageController.createMessage);
chatRoute.get('/message/getAll/:conversationID', roomRole, messageController.getMessage);

export default chatRoute;
