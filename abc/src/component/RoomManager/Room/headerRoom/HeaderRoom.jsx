import React from 'react';
import './HeaderRoomCss.css';

const HeaderRoom = ({ props }) => {
  return (
    <div className='HeaderRoom'>
      <ul>
        <li onClick={() => props.setSelect(1)}>Thông tin phòng</li>
        <li onClick={() => props.setSelect(2)}>Hóa đơn</li>
      </ul>
    </div>
  )
}

export default HeaderRoom