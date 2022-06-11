import React from 'react';
import './RightSideCss.css';
import { BiHome } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import {Link} from 'react-router-dom';

const RightSide = () => {
    return (
        <div className='RightSide'>
            <div className='rs-Icon'>
                <span><Link to='/Home'><BiHome /></Link></span>
                <span><Link to='/Home'><AiOutlineSetting /></Link></span>
                <span><Link to='/Notification'><IoNotifications /></Link></span>
                <span><Link to='/Home'><GrLanguage /></Link></span>
            </div>
            <div className='Advertisement'>
                
            </div>
        </div>
    )
}

export default RightSide