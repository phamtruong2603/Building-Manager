import React, { useContext } from 'react';
import './HomeCss.css';
import Sidebar from './Sidebar/Sidebar';
import Post from './Posts/Post';
import RightSide from './RightSide/RightSide';
import { Providers } from '../contextAPI/Provider';
import { socket } from '../contextAPI/ProviderSocket';
import { useEffect } from 'react';


const Home = () => {
  const { user } = useContext(Providers);
  useEffect(() => {
    socket.emit('newConnectUser', user?.data?.userID);
  }, [user])

  return (
    <div>
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