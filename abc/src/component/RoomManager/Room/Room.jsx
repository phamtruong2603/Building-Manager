import React, { useState } from 'react';
import './RoomCss.css'
import RoomInformation from './RoomInformation/RoomInformation';
import HeaderRoom from './headerRoom/HeaderRoom';
import Bill from '../Bill/Bill';

const Room = () => {
  const [select, setSelect] = useState(1)
  return (
    <div className='room'>
      <HeaderRoom
        props={{select, setSelect}}
      />
      {select === 1 ? <RoomInformation /> : <Bill />}
    </div>
  )
}

export default Room