import React, { useContext, useEffect, useState } from 'react';
import './AboutCss.css';
import { ProviderSockets } from '../../contextAPI/ProviderSocket';
import { Providers } from '../../contextAPI/Provider';
import RightSide from '../../RightSide/RightSide';

const About = () => {
  const { socket } = useContext(ProviderSockets);
  const { user } = useContext(Providers);
  const [message, setMessage] = useState({ userID: user?.data?.userID })
  const Click = () => {
    socket.emit('message', message)
  }
  useEffect(() => {
    socket.on('pushMessage', (data) => {
      console.log(data);
    });
  }, [socket])
  return (
    <div className='About'>
      <div className='contentAbout'>
        <input type="text" name='content'
          onChange={(e) =>
            setMessage({
              ...message,
              content: e.target.value
            })} />
        <button onClick={Click}>click</button>
      </div>
      <div className='db-RightSide'>
        <RightSide />
      </div>
    </div>
  )
}

export default About