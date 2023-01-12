import React, { useEffect, useRef, useState } from 'react';
import './listChatCss.css';
import { getAllConver, getUserCV } from '../../auth/chat';
import { avatar } from '../../auth/authReducer';

const ListChat = () => {
  const response = useRef([])
  useEffect(() => {
    (async () => {
      const data = await getAllConver();
      if (data) {
        data.forEach(async roomID => {
          console.log(roomID)
          response.current.push(await getUserCV({ conversationID: roomID.conversationID }));
        })
      }
    })()
  }, [])
  console.log(response.current)

  return (
    <div className='listChat'>
      {/* {room.map((user, index) => {
        let avatarImg = user.avatar ? user.avatar : avatar
        return (
          <div key={index} className=''>
            <div>
              <div className=''>
                <img src={avatarImg} alt="" />
              </div>
              <div className=''>
                <p>{user.fullName ? user.fullName : 'user'}</p>
              </div>
            </div>
            <button></button>
          </div>
        )
      })} */}
    </div>
  )
}

export default ListChat
