import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../component/Dashboard/Dashboard';
import Home from '../component/Event/Home';
import RoomManager from '../component/RoomManager/RoomManager';
import About from '../component/Setting/about/About';
import Notification from '../component/Notification/Notification';
import './SwitchModeCss.css';
import { ProviderSwitchModes } from '../component/contextAPI/ProviderSwitchMode';
// import ProtectedRoutes from '../ProtectedRoutes';
import StartPage from '../component/startPage/StartPage';

const SwitchMode = () => {
    const { them } = useContext(ProviderSwitchModes)
    return (
        <div className={them}>
            <div className='blur' style={{ top: '-18%', right: '0' }}></div>
            <div className='blur' style={{ top: '36%', left: '-8rem' }}></div>
            <div className='blur' style={{ bottom: '-10%', right: '8rem' }}></div>
            <Routes>
                <Route path="/" element={<StartPage />} />
                {/* <Route element={<ProtectedRoutes />}> */}
                <Route path="/Home" element={<Home />} />
                <Route path='/Dashboard/*' element={<Dashboard />} />
                <Route path="/Room/*" element={<RoomManager />} />
                <Route path="/About" element={<About />} />
                <Route path="/Notification" element={<Notification />} />
                {/* </Route> */}
            </Routes>
        </div>
    )
}

export default SwitchMode;