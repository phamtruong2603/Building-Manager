import React from 'react';
import './chatCss.css'
import ListChat from './listChat/ListChat';
import BoxChat from './boxChat/BoxChat';
import RightSide from '../RightSide/RightSide';

const Chat = () => {
  return (
    <div className='mainChat'>
      <div style={{display:'flex'}}>
        <ListChat />
        <BoxChat />
      </div>
      <div className='RightSides'>
        <RightSide />
      </div>
    </div>
  )
}

export default Chat