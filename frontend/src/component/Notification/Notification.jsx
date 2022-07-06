import React, { useContext, useEffect, useState } from 'react';
import './NotificationsCss.css';
import { getNoti } from '../auth/notification';
import { ProviderSockets } from '../contextAPI/ProviderSocket';
import { ProviderNotifications } from '../contextAPI/ProviderNotification';
import { Link, useNavigate } from 'react-router-dom';
import { seenNoti } from '../auth/notification';

const Notification = () => {
  const [noti, setNoti] = useState([]);
  const { socketNoti } = useContext(ProviderSockets);
  const { checkNewNoti, setCheckNewNoti } = useContext(ProviderNotifications);
  const navigate = useNavigate()

  const SeenNoti = async (id) => {
    await seenNoti(id)
  }

  useEffect(() => {
    if (socketNoti !== undefined) {
      setNoti([
        socketNoti,
        ...noti
      ])
      setCheckNewNoti(checkNewNoti + 1)
    }
  }, [socketNoti])

  useEffect(() => {
    (async function () {
      setNoti(await getNoti())
    })()
  }, [])
  let newNoti = noti.slice(0, 5)
  
  const notification = () => {
    navigate('/Notification')
  }
  return (
    <div className='Noti'>
      <div className='Notification'>
        {newNoti?.map((list, index) => {
          let seen = list.seen ? '' : 'seen'
          return (
            <div key={index} className={`NotificationList ${seen}`}>
              <div className='nt-avatar'>
                <img src="https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png" alt="" />
              </div>
              <div className={`nt-content`}>
                <span><Link to=''>{list.interactiveUser}</Link></span>
                {` ${list.interactive} `}
                <span onClick={() => SeenNoti(list.notificationID)}>{` bài đăng `}</span>
                của bạn
              </div>
            </div>
          )
        })}
        <div>
          <button onClick={notification} className='button nt-button'>Xem tất cả</button>
        </div>
      </div>
    </div>
  )
}

export default Notification