import { Bill } from '../entities/Bill';
import { RequestType } from '../types/RequestType';
import { ResponseType } from '../types/ResponseType';
import { getRepository, Like } from 'typeorm';
import { Room } from '../entities/Room';
import formatDate from '../utils/fomatDate';

const billController = {
    //GET: .../bill/:roomID
    getBillDetail: async (req: RequestType, res: ResponseType<Bill>) => {
        const { year, month } = req.body;
        if (year === undefined) {
            return res.json({
                success: false,
                message: 'Year is required !!!'
            });
        }
        if (month === undefined) {
            return res.json({
                success: false,
                message: 'Month is required !!!'
            });
        }
        const room = await getRepository(Room).findOne(+req.params.roomID);
        const currentDate = formatDate(month, year);
        const pastDate = month === 1 ? formatDate(11, year - 1) : formatDate(month - 1, year);
        try {
            const currentBill = await getRepository(Bill).findOne({
                where: {
                    room: room,
                    createAt: Like(`${currentDate}%`),
                },
            });
            if (!currentBill) {
                return res.json({
                    success: false,
                    message: `Dont have data in ${currentDate}`
                });
            }
            const pastBill = await getRepository(Bill).findOne({
                where: {
                    createAt: Like(`${pastDate}%`),
                },
            });
            if (!pastBill) {
                return res.json({
                    success: false,
                    message: `Dont have data in ${pastDate}`
                });
            }
            return res.status(200).json({
                success: true,
                data: [pastBill, currentBill]
            });
        } catch (error) {
            console.log(error);
        }
    },
    //POST: .../bill/:roomID
    createBill: async (req: RequestType, res: ResponseType<Bill>) => {
        const { electricNumber, waterBlockNumber, sent, paid } = req.body;
        if (electricNumber === undefined) {
            return res.json({
                success: false,
                message: 'ElectricNumber is required !!!'
            });
        }

        if (waterBlockNumber === undefined) {
            return res.json({
                success: false,
                message: 'WaterBlockNumber is required !!!'
            });
        }

        if (sent === undefined) {
            return res.json({
                success: false,
                message: 'Sent is required !!!'
            });
        }
        try {
            const room = await getRepository(Room).findOne({
                roomID: +req.params.roomID
            });
            if (room) {
                const date = new Date();
                const checkBillExist = await getRepository(Bill).findOne({
                    select: ['billID'],
                    where: {
                        room: { roomID: +req.params.roomID },
                        createAt: Like(`${formatDate(date.getMonth(), date.getFullYear())}%`)
                    },
                });
                if (checkBillExist) {
                    return res.json({
                        success: false,
                        message: `Had has bill in ${date.getMonth() + 1}, ${date.getFullYear()}`
                    });
                }
                const bill = new Bill();
                bill.electricNumber = electricNumber;
                bill.waterBlockNumber = waterBlockNumber;
                bill.paid = paid;
                bill.sent = sent;
                bill.room = room;

                const newBill = await getRepository(Bill).create(bill);
                const newBillDB = await getRepository(Bill).save(newBill);

                if (newBillDB) {
                    return res.status(201).json({
                        success: true,
                        data: newBillDB
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
    updateBill: async (req: RequestType, res: ResponseType<Bill>) => {
        try {
            const bill = await getRepository(Bill).findOne({
                where: {
                    billID: +req.params.billID
                },
            });
            if (bill) {
                const detailBill: Bill = { ...bill, ...req.body };
                const newBillDB = await getRepository(Bill).save(detailBill);
                if (newBillDB) {
                    return res.status(200).json({
                        success: true,
                        message: 'update successful',
                        data: newBillDB
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

};

export default billController;