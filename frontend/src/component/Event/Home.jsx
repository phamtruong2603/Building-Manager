import React, { useEffect } from 'react';
import './HomeCss.css';
import Sidebar from './Sidebar/Sidebar';
import Post from './Posts/Post';
import RightSide from '../RightSide/RightSide';
import { socket } from '../contextAPI/ProviderSocket';
import Header from './headerResponsive/Header';
import { useSelector } from 'react-redux';
import { userSlector } from '../../redux/reducer/userReducer';


const Home = () => {
  const user = useSelector(userSlector)
  useEffect(() => {
    socket.emit('newConnectUser', user?.data?.userID);
  }, [user])

  return (
    <div>
      <div className='headerResponsive'>
        <Header />
      </div>
      <div className='home'>
        <div className='sidebarHome'>
          <Sidebar />
        </div>
        <div className='HomePost'>
          <Post />
        </div>
        <div className='RightSides'>
          <RightSide />
        </div>
      </div>
    </div>
  )
}

export default Home