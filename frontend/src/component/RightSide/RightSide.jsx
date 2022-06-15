import React, { useState } from 'react';
import './RightSideCss.css';
import { BiHome } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { Link } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Setting from '../Setting/Setting';

const RightSide = () => {
    const [hidden, setHidden] = useState(false)
    const [hiddenSetting, setHiddenSetting] = useState(false)
    const hiddenNoti = () => {
        setHidden(!hidden)
        setHiddenSetting(false)
    }
    const hiddenST = () => {
        setHiddenSetting(!hiddenSetting)
        setHidden(false)
    }
    return (
        <div className='RightSide'>
            <div className='rs-Icon'>
                <span><Link to='/Home'><BiHome /></Link></span>
                <span><Link to='/Home'><GrLanguage /></Link></span>
                <span className='rs-notification'>
                    <span onClick={hiddenNoti}><IoNotifications /></span>
                    <span className='nt-count'></span>
                </span>
                <span onClick={hiddenST}><AiOutlineSetting /></span>
            </div>
            <div>
                <div className={!hidden ? 'hiddenNoti' : 'showNoti'}>
                    <Notification />
                </div>
                <div className={!hiddenSetting ? 'hiddenSeting' : 'showSetting'}>
                    <Setting />
                </div>
            </div>
        </div>
    )
}

export default RightSide