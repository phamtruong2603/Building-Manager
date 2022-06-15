import React, { useEffect, useState } from 'react';
import './AdminRoomCss.css';
import { getAllRoom } from '../../../auth/room';
import { deletaRoom } from '../../../auth/room';
import { useNavigate } from 'react-router-dom';

const AdminRoom = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({})

  useEffect(() => {
    (async function () {
      let roomData = await getAllRoom()
      setRoom(roomData)
    })()
  }, [])

  const deleteRoom = async (id) => {
    deletaRoom(id);
    let roomData = await getAllRoom()
    setRoom(roomData)
  }
  const checkID = (id) => {
    navigate(`/Room/${id}`);
  }

  return (
    <div className='AdminRoom'>
      <ul>
        {room.data?.map((list, index) => {
          return (
            <div key={index} className="listRoom">
              < li onClick={() => checkID(list.roomID)}>
                {`Phòng ${list.roomName}`}
              </li>
              <button className='button AR-bt' onClick={() => deleteRoom(list.roomID)}>delete</button>
            </div>)
        })}
      </ul>
    </div >
  )
}

export default AdminRoom