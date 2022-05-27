import React from 'react';
import './DashboardCss.css';
import User from './Users/User';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import Header from '../Header/Header';
import { Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar/Sidebar';
import ChangePass from './ChangePass/ChangePass';

const Dashboard = () => {

    return (
        <div>
            <Header />
            <div className='Dashboard'>
                <div className='SidebarDashboard'>
                    <Sidebar />
                </div>
                <div className='DashboardContent'>
                    <Routes>
                        <Route path='/ChangeInformation' element={<PersonalInformation />} />
                        <Route path='/ChangePassword' element={<ChangePass />} />
                        <Route path='/' element={<User />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Dashboard