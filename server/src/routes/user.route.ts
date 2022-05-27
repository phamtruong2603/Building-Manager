import express from 'express';
import userController from '../controllers/user.controller';
import authVerifyToken from '../middleware/authVerifyToken';
import authRole from '../middleware/authRole';
import multer from 'multer';
const routeUser = express.Router();

const upload = multer({
    dest: './public/image/avatar',
});

routeUser.post('/login', userController.loginUser);
routeUser.post('/register', userController.registerUser);

routeUser.use(authVerifyToken);
routeUser.get('/user', userController.getUser);
routeUser.get('/detailUser', userController.getDetailUser);
routeUser.put('/updateUser',
    upload.single('avatar'),
    userController.updateDetailUser
);
routeUser.put('/changePW', userController.changePassword);

routeUser.use(authRole('admin'));
routeUser.get('/allUser', userController.getAllUser);
routeUser.delete('/deleteUser/:userID', userController.deleteUser);

export default routeUser;