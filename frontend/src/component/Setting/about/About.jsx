import React, { useContext, useEffect, useState } from 'react';
import './AboutCss.css';
import { ProviderSockets } from '../../contextAPI/ProviderSocket';
import { Providers } from '../../contextAPI/Provider';
import RightSide from '../../RightSide/RightSide';

const About = () => {
  const { socket } = useContext(ProviderSockets);
  const { user } = useContext(Providers);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState();
  const [listMes, setListMes] = useState([]);
  const joinRoom = () => {
    socket.emit('join_room', room)
  }
  const Click = () => {
    const mes = {
      userID: user?.data?.userID,
      room,
      ...message,
    }
    socket.emit('message', mes)
    setMessage('')
  }
  useEffect(() => {
    socket.on('pushMessage', (data) => {
      setListMes([
        ...listMes,
        data,
      ])
    });
  }, [socket, listMes])
  return (
    <div className='About'>
      <div>
        <div className='contentAbout'>
          <input type="text" name='room'
            onChange={(e) =>
              setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>click</button>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <div className="message-container">
            {listMes.map((mes, index) => {
              return (
                <div
                  key={index}
                  className="message"
                  id={user?.data?.userID === mes.userID ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{mes.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-footer">
          <div className='contentAbout'>
            <input type="text" name='content'
              value={message.content || ''}
              onChange={(e) =>
                setMessage({
                  content: e.target.value
                })}
            />
            <button onClick={Click}>click</button>
          </div>
        </div>
      </div>
      {/* <div className='db-RightSide'>
        <RightSide />
      </div> */}
    </div>

  )
}

export default About