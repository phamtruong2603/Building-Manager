import React, { useContext } from 'react';
import './SettingCss.css';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { socket } from '../contextAPI/ProviderSocket';
import { useNavigate } from 'react-router-dom';
import { Providers } from '../contextAPI/Provider';

const Setting = () => {
  const { user, dispatch } = useContext(Providers);
  const roomID = user?.data?.room?.roomID
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem('token');
    socket.emit('logOut', '')
    dispatch({
      type: 'login',
      payload: {},
    })
    navigate('/');
  }
  const about = () => {
    navigate('/About');
  }
  const Room = () => {
    user?.data?.isAdmin ?
      navigate('/Room') :
      navigate(`/Room/${roomID}`)

  }
  return (
    <div className='setting'>
      <div></div>
      <ul>
        <li onClick={Room}>
          <span>Thông tin phòng</span>
          <span><MdOutlineArrowForwardIos /></span>
        </li>
        <li>
          <span>Màn hình</span>
          <span><MdOutlineArrowForwardIos /></span>
        </li>
        <li>
          <span>Cài đặt ứng dụng</span>
          <span><MdOutlineArrowForwardIos /></span>
        </li>
        <li onClick={about}>
          <span>Trợ giúp & hỗ trợ</span>
          <span><MdOutlineArrowForwardIos /></span>
        </li>
        <li>
          <span onClick={LogOut}>LogOut</span>
        </li>
      </ul>
    </div>
  )
}

export default Setting