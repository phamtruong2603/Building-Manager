import React, { useState } from 'react';
import './CreateRoom.css';
import { createRoom } from '../../../auth/room';

const CreateRoom = () => {
    const [dataRoom, setDataRoom] = useState({ isEmpty: true });

    //lấy thông tin thêm mới phòng
    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setDataRoom({
            ...dataRoom,
            [name]: value,
        })
    }
    //tạo mới phòng ở. admin có quyền
    const submit = (e) => {
        e.preventDefault()
        createRoom(dataRoom)
        setDataRoom({ isEmpty: true })
    }
    return (
        <div>
            <form className="from" method='POST' onSubmit={submit}>
                <div className='createRoom'>
                    <label htmlFor="roomName">Tên Phòng:</label>
                    <input type="text" id="roomName" value={dataRoom.roomName || ''} placeholder="roomName" name="roomName" onChange={setPrams} />
                </div>

                <div className='createRoom'>
                    <label htmlFor="rentPrice">Giá Phòng:</label>
                    <input type="text" id="rentPrice" value={dataRoom.rentPrice || ''} placeholder="rentPrice" name="rentPrice" onChange={setPrams} />
                </div>

                <div className='createRoomRadio'>
                    <span>WIFI</span>
                    <input type="radio" id="haveWifi" value={true} name="haveWifi" onChange={setPrams} />
                    <label htmlFor="haveWifi">Có</label>

                    <input type="radio" id="haveWifi" value={false} name="haveWifi" onChange={setPrams} />
                    <label htmlFor="haveWifi">Không</label>
                </div>

                <button className='createRoomBt'>Continue</button>
            </form>
        </div>
    )
}

export default CreateRoom