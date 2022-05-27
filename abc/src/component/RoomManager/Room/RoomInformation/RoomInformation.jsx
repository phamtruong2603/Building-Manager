import React, { useContext, useEffect, useState } from 'react';
import './RoomInfor.css';
import { useParams } from 'react-router-dom'
import { getRoomDetail } from '../../../auth/room';
import { deleteUser } from '../../../auth/authReducer';
import { Providers } from '../../../contextAPI/Provider';
import { numberFormat } from '../../../auth/room';

const RoomInformation = () => {
    const { roomID } = useParams();
    const { user } = useContext(Providers)
    const [room, setRoom] = useState({})
    const [users, setUsers] = useState([])

    // lấy toàn bộ thông tin phòng
    useEffect(() => {
        (async function () {
            let response = await getRoomDetail(roomID)
            setRoom(response.data)
            setUsers(response.data.data.users)
        })()
    }, [roomID]);

    // xóa người dùng. admin có quyền
    const click = (userID) => {
        deleteUser(userID)
    }

    //ngày thuê
    let date = new Date(room?.data?.createAt)
    const dateOfHire = `${date?.getDate()}/${date?.getMonth() + 1}/${date?.getFullYear()}`

    return (
        <div className='mainRoom'>
            <div className='Room'>
                <p>Thông tin chung</p>
                <div className='RoomInfor'>
                    <div>
                        <div className='listInforRoom defaultListInforRoom' >
                            <label htmlFor="">Giá thuê:</label>
                            <span>{numberFormat.format(room?.data?.rentPrice)}</span>
                        </div>
                        <div className='listInforRoom defaultListInforRoom'>
                            <label htmlFor="">Ngày thuê:</label>
                            <span>{dateOfHire}</span>
                        </div>
                        <div className='listInforRoom defaultListInforRoom' >
                            <label htmlFor="">Internet:</label>
                            <span>{numberFormat.format(40000)}/phòng</span>
                        </div>
                        <div className='listInforRoom defaultListInforRoom' >
                            <label htmlFor="">Gửi xe:</label>
                            <span>{numberFormat.format(20000)}/xe</span>
                        </div>
                    </div>
                    <div>
                        <div className='listInforRoom defaultListInforRoom' >
                            <label htmlFor="">Điện:</label>
                            <span>{numberFormat.format(4000)}/số</span>
                        </div>
                        <div className='listInforRoom defaultListInforRoom' >
                            <label htmlFor="">Nước:</label>
                            <span>{numberFormat.format(25000)}/khối</span>
                        </div>
                        <div className='listInforRoom defaultListInforRoom' >
                            <label htmlFor="">Vệ sinh:</label>
                            <span>{numberFormat.format(40000)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='Users'>
                <p>Thông tin người thuê</p>
                <ul>
                    <li>Họ tên</li>
                    <li>Số điện thoại</li>
                    <li>Số CMND</li>
                    <li>Ngày sinh</li>
                    <li>Giới tính</li>
                    {user?.data?.isAdmin ?
                        <li></li> : null
                    }
                </ul>
                {users.map((list, index) => {
                    let birth = list.dateOfBirth ? new Date(list.dateOfBirth) : null
                    const dateOfBirth = birth ? `${birth.getDate()}/${birth.getMonth() + 1}/${birth.getFullYear()}` : null
                    // console.log(list.isAdmin)
                    return (
                        <ul className='listUser' key={index}>
                            <li>{list.fullName ? list.fullName : '*'}</li>
                            <li>{list.phoneNumber ? list.phoneNumber : '*'}</li>
                            <li>{list.cardNumber ? list.cardNumber : '*'}</li>
                            <li>{dateOfBirth ? dateOfBirth : '*'}</li>
                            <li>{list.sex ? list.sex : '*'}</li>
                            {user?.data?.isAdmin ?
                                <li><button onClick={() => click(list.userID)}>delete</button></li> : null
                            }
                        </ul>
                    )
                })}
            </div>

            {/* <div className='Users'>
                <p>Thông tin các dịch vụ</p>
                <ul>
                    <li>
                        <input type="text" />
                        <label htmlFor="">Tiền phòng</label>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div> */}
        </div >
    )
}

export default RoomInformation