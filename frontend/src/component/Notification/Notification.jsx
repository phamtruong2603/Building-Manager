import React, { useContext, useEffect, useState } from 'react';
import './NotificationsCss.css';
import Header from '../Header/Header';
import { getNoti } from '../auth/notification';
import { ProviderSockets } from '../contextAPI/ProviderSocket';

const Notification = () => {
  const [noti, setNoti] = useState([])
  const { socketNoti } = useContext(ProviderSockets);
  console.log(noti)
  console.log(socketNoti)
  useEffect(() => {
    setNoti([socketNoti, ...noti])
  }, [socketNoti])

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
          return (
            <p key={index}>{`${list.content} bài post của bạn`}</p>
          )
        })}
      </div>
    </div>
  )
}

export default Notification