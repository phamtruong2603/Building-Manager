import React from 'react';
import './DashboardCss.css';
import User from './Users/User';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import { Routes, Route } from "react-router-dom";
import ChangePass from './ChangePass/ChangePass';
import RightSide from '../Event/RightSide/RightSide';

const Dashboard = () => {

    return (
        <div className='Dashboard'>
            <div className='DashboardContent'>
                    <Routes>
                        <Route path='/ChangeInformation' element={<PersonalInformation />} />
                        <Route path='/ChangePassword' element={<ChangePass />} />
                        <Route path='/' element={<User />} />
                    </Routes>
            </div>
            <div className='db-RightSide'>
                <RightSide />
            </div>
        </div>
    )
}

export default Dashboard