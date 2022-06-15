import React, { useContext } from 'react';
import './RoomManagerCss.css';
import { Routes, Route } from "react-router-dom";
import { Providers } from '../contextAPI/Provider';
import CreateRoom from './SideBarRoom/CreateRoom/CreateRoom';
import Room from './Room/Room';
import SideBarRoom from './SideBarRoom/SideBarRoom';
import RightSide from '../RightSide/RightSide';

const RoomManager = () => {
    const { user } = useContext(Providers)
    return (
        <div className='RoomManager'>
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

            <div className='db-RightSide'>
                <div className='rm-rs'>
                    <RightSide />
                </div>
                <div className='sidebarRoom'>
                    <SideBarRoom />
                </div>
            </div>
        </div>
    )
}

export default RoomManager