import React, { useContext, useEffect, useState } from 'react';
import './NotificationsCss.css';
import RightSide from '../RightSide/RightSide'
import { getNoti } from '../auth/notification';
import { ProviderSockets } from '../contextAPI/ProviderSocket';
import { Link, useNavigate } from 'react-router-dom';
import { seenNoti } from '../auth/notification';

const Notification = () => {
  const [noti, setNoti] = useState([])
  const { socketNoti } = useContext(ProviderSockets);
  const navigate = useNavigate()

  const SeenNoti = async (id) => {
    await seenNoti(id)
  }

  useEffect(() => {
    if (socketNoti) {
      noti.push(socketNoti)
    }
  }, [noti, socketNoti])

  useEffect(() => {
    (async function () {
      setNoti(await getNoti())
    })()
  }, [])

  const notification = () => {
    navigate('/Notification')
  }
  return (
    <div className='Noti'>
      <div className='Notification'>
        {noti?.map((list, index) => {
          let seen = list.seen ? '' : 'seen'
          return (
            <div key={index} className='NotificationList'>
              <div className='nt-avatar'>
                <img src="https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png" alt="" />
              </div>
              <div className={`nt-content ${seen}`}>
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