import express from 'express';
import authVerifyToken from '../middleware/authVerifyToken';
import billController from '../controllers/bill.controller';
import roomRole from '../middleware/roomRole';
import authRole from '../middleware/authRole';

const billRoute = express.Router();

billRoute.use(authVerifyToken);
billRoute.post('/:roomID', roomRole, billController.getBillDetail);

billRoute.use(authRole('admin'));
billRoute.post('/createBill/:roomID', billController.createBill);

export default billRoute;
