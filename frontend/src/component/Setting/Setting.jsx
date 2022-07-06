import React, { useContext } from 'react';
import './SettingCss.css';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { socket } from '../contextAPI/ProviderSocket';
import { useNavigate } from 'react-router-dom';
import { Providers } from '../contextAPI/Provider';
import { ProviderSwitchModes } from '../contextAPI/ProviderSwitchMode';

const Setting = () => {
  const { them, setThem } = useContext(ProviderSwitchModes)
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
  const switchMode = () => {
    setThem(them === 'dark' ? 'light' : 'dark')
  }
  return (
    <div className='setting'>
      <div></div>
      <ul>
        <li onClick={Room}>
          <span>Thông tin phòng</span>
          <span><MdOutlineArrowForwardIos /></span>
        </li>
        <li onClick={switchMode}>
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
        <li onClick={LogOut}>
          <span>LogOut</span>
        </li>
      </ul>
    </div>
  )
}

export default Setting