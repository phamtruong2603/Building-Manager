import { Request } from 'express';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import { ResponseType } from '../types/ResponseType';
import { Secret, sign } from 'jsonwebtoken';
import { hash, verify } from 'argon2';
import { Room } from '../entities/Room';
import { RequestType } from '../types/RequestType';

const userController = {
    //POST: .../login
    loginUser: async (req: Request, res: ResponseType<User>) => {
        const { phoneNumber, password } = req.body;
        try {
            const user = await getRepository(User).findOne({
                select: ['userID', 'isAdmin', 'fullName', 'phoneNumber', 'password'],
                where: {
                    phoneNumber
                },
                relations: ['room'],
            });
            if (!user) {
                return res.json({
                    success: false,
                    message: 'phoneNumber or password is incorrect'
                });
            }
            const checkPassword = await verify(user.password, password);
            if (!checkPassword) {
                return res.json({
                    success: false,
                    message: 'phoneNumber or password is incorrect'
                });
            }
            const token = await sign({ id: user.userID }, process.env.ACCESS_TOKEN_SECRET as Secret, {
                expiresIn: '5h'
            });

            return res.status(200).json({
                success: true,
                data: user,
                token
            });


        } catch (error) {
            console.log(error);
        }
    },
    //POST: .../register
    registerUser: async (req: Request, res: ResponseType<User>) => {
        const { phoneNumber, password, isAdmin, roomID } = req.body;
        try {
            const checkUser = await getRepository(User).findOne({ phoneNumber });
            if (checkUser) {
                return res.json({
                    success: false,
                    message: 'PhoneNumber already exists'
                });
            }
            const hashPassword = await hash(password);
            const room = await getRepository(Room).findOne(roomID);
            if (room) {
                const newUser = new User();
                newUser.phoneNumber = phoneNumber;
                newUser.isAdmin = isAdmin;
                newUser.password = hashPassword;
                newUser.room = room;

                const user = await getRepository(User).create(newUser);
                const newUserDb = await getRepository(User).save(user);

                if (newUserDb) {
                    const newRoom: Room = { ...room, isEmpty: false };
                    if (room.isEmpty) {
                        await getRepository(Room).save(newRoom);
                    }
                    return res.status(201).json({
                        success: true,
                        message: `phoneNumber: ${newUser.phoneNumber} registered successfully !!!`
                    });
                }
            }
            return res.status(404).json({
                success: false,
                message: 'Room not found !!!'
            });
        } catch (error) {
            console.log(error);
        }
    },
    //GET: .../user
    getUser: async (req: RequestType, res: ResponseType<User>) => {
        try {
            const user = await getRepository(User).findOne({
                select: ['userID', 'isAdmin', 'fullName', 'phoneNumber'],
                where: {
                    userID: req.userID
                },
                relations: ['room']
            });
            if (user) {
                return res.status(200).json({
                    success: true,
                    data: user
                });
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        } catch (error) {
            console.log(error);
        }
    },
    //GET: .../detailUser
    getDetailUser: async (req: RequestType, res: ResponseType<User>) => {
        try {
            const user = await getRepository(User).createQueryBuilder('user')
                .select(['userID', 'fullName', 'phoneNumber', 'sex', 'cardNumber', 'address', 'haveMotorbike', 'avatar'])
                .addSelect('DATE_FORMAT(dateOfBirth,\'%Y-%m-%d\')', 'dateOfBirth')
                .where('user.userID = :id', { id: req.userID })
                .getRawOne();
            if (user) {
                return res.status(200).json({
                    success: true,
                    data: user
                });
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        } catch (error) {
            console.log(error);
        }
    },
    //PUT .../updateUser
    updateDetailUser: async (req: RequestType, res: ResponseType<User>) => {
        console.log(req.file);
        console.log(req.body);
        const avatar = req.protocol + '://' + req.get('host')+ '/' + req.file?.path;
        try {
            const user = await getRepository(User).findOne({ userID: req.userID });
            if (user) {
                const detailUser: User = { ...user, ...req.body, avatar };
                const newUser = await getRepository(User).save(detailUser);
                if (newUser) {
                    return res.status(200).json({
                        success: true,
                        message: 'update successful',
                        data: newUser
                    });
                }
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        } catch (error) {
            console.log(error);
        }
    },
    //PUT .../changePW
    changePassword: async (req: RequestType, res: ResponseType<User>) => {
        try {
            const { password, newPassword } = req.body;
            const user = await getRepository(User).findOne({
                where: {
                    userID: req.userID
                }
            });
            if (user) {
                const checkPassword = await verify(user.password, password);
                const newPasswordHash = await hash(newPassword);
                if (checkPassword) {
                    const newUser: User = { ...user, password: newPasswordHash };

                    const newUserDB = await getRepository(User).save(newUser);
                    if (newUserDB) {
                        return res.status(200).json({
                            success: true,
                            message: 'Change password successfully!!!'
                        });
                    }
                }
                return res.json({
                    success: false,
                    message: 'Password is incorrected !!!',
                });
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        } catch (error) {
            console.log(error);
        }
    },
    //GET: .../allUser
    getAllUser: async (req: RequestType, res: ResponseType<User>) => {
        try {
            const user = await getRepository(User).find({
                select: ['userID', 'fullName']
            });
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found !!!'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.log(error);
        }
    },
    //delete User
    deleteUser: async (req: RequestType, res: ResponseType<User>) => {
        const userID = +req.params.userID;
        try {
            const user = getRepository(User).delete(userID);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'fail'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'successfuly!!!'
            });

        } catch (error) {
            console.log(error);
        }
    },
};

export default userController;