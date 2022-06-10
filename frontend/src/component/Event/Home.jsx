import React from 'react';
import './HomeCss.css';
import Sidebar from './Sidebar/Sidebar';
import Post from './Posts/Post';
import RightSide from './RightSide/RightSide';

const Home = () => {

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