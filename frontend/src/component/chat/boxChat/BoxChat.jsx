import React, { useContext, useEffect, useState } from 'react';
import './boxChatCss.css';
import { AiOutlineSend } from "react-icons/ai";
import { Providers } from '../../contextAPI/Provider';
import { ProviderSockets } from '../../contextAPI/ProviderSocket';

const BoxChat = () => {
  const { socket } = useContext(ProviderSockets);
  const { user } = useContext(Providers);
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState([]);
  const room = 5;

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
      setChatMessage([
        ...chatMessage,
        data,
      ])
    });
  }, [socket, chatMessage])
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {chatMessage.map((mes, index) => {
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
          <button onClick={Click}><AiOutlineSend /></button>
        </div>
      </div>
    </div>
  )
}

export default BoxChat