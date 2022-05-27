import express from 'express';
import roomController from '../controllers/room.controller';
import authRole from '../middleware/authRole';
import authVerifyToken from '../middleware/authVerifyToken';
import roomRole from '../middleware/roomRole';

const routeRoom = express.Router();

routeRoom.use(authVerifyToken);
routeRoom.get('/:roomID', roomRole,roomController.getRoomDetail);

routeRoom.use(authRole('admin'));
routeRoom.post('/', roomController.createRoom);
routeRoom.put('/:id', roomController.updateRoom);
routeRoom.delete('/:id', roomController.deleteRoom);
routeRoom.get('/', roomController.getAllRoom);



export default routeRoom;