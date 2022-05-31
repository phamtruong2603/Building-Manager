import React, { useEffect, useState } from 'react';
import './NotificationsCss.css';
import Header from '../Header/Header';
import { getNoti } from '../auth/notification';

const Notification = () => {
  const [noti, setNoti] = useState([])
  useEffect(() => {
    (async function () {
      setNoti(await getNoti())
    })()
  }, [])
  return (
    <div>
      <Header />
      <div className='Notification'>
        {noti?.map((list, index) => {
          console.log(list.content)
          return(
            <p key={index}>{`${list.content} bài post của bạn`}</p>
          )
        })}
      </div>
    </div>
  )
}

export default Notification