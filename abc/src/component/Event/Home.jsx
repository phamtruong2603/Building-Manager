import React from 'react';
import './HomeCss.css';
import Header from '../Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Post from './Posts/Post';
import CreatePost from './createPost/CreatePost';

const Home = () => {

  return (
    <div>
      <div className='headerEvent'>
        <Header />
      </div>
      <div className='home'>
        <div className='sidebarHome'>
          <Sidebar />
        </div>
        <div className='HomePost'>
          <Post />
        </div>
        <div className='createPostHome'>
          <CreatePost />
        </div>
      </div>
    </div>
  )
}

export default Home