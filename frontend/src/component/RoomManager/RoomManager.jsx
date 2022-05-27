import React, { useContext } from 'react';
import './RoomManagerCss.css';
import { Routes, Route } from "react-router-dom";
import Header from '../Header/Header';
import { Providers } from '../contextAPI/Provider';
import SideBarRoom from './SideBarRoom/SideBarRoom';
import CreateRoom from './SideBarRoom/CreateRoom/CreateRoom';
import Room from './Room/Room';

const RoomManager = () => {
    const { user } = useContext(Providers)

    return (
        <div>
            <Header />
            <div className='RoomManager'>
                <div className='SidebarRoom'>
                    <SideBarRoom />
                </div>
                <div className='RoomContent'>
                    {!user.data?.isAdmin ?
                        <Routes>
                            <Route path={`/:roomID`} element={<Room />} />
                        </Routes>
                        :
                        <Routes>
                            <Route path='/:roomID' element={<Room />} />
                            <Route path='/createroom' element={<CreateRoom />} />
                        </Routes>
                    }
                </div>
            </div>
        </div>
    )
}

export default RoomManager