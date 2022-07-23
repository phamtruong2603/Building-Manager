import React from 'react';
import './chatCss.css'
import ListChat from './listChat/ListChat';
import BoxChat from './boxChat/BoxChat';

const Chat = () => {
  return (
    <div className='mainChat'>
      <BoxChat />
      <ListChat />
    </div>
  )
}

export default Chat