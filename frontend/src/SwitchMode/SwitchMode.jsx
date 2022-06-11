import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../component/Dashboard/Dashboard';
import Home from '../component/Event/Home';
import RoomManager from '../component/RoomManager/RoomManager';
import StartPage from '../component/startPage/StartPage';
import About from '../component/about/About';
import Notification from '../component/Notification/Notification';
import './SwitchModeCss.css';
import { ProviderSwitchModes } from '../component/contextAPI/ProviderSwitchMode';

const SwitchMode = () => {
    const { them } = useContext(ProviderSwitchModes)
    return (
        <div className={them}>
            <div className='blur' style={{ top: '-18%', right: '0', zIndex: '-1' }}></div>
            <div className='blur' style={{ top: '36%', left: '-8rem', zIndex: '-1' }}></div>
            <div className='blur' style={{ bottom: '-10%', right: '8rem', zIndex: '-1' }}></div>
            {/* Routes. Đường dẫn đến các trang */}
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path='/Dashboard/*' element={<Dashboard />} />
                <Route path="/Room/*" element={<RoomManager />} />
                <Route path="/About" element={<About />} />
                <Route path="/Notification" element={<Notification />} />
            </Routes>
        </div>
    )
}

export default SwitchMode;