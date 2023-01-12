import React, { useContext, useState } from 'react';
import './RightSideCss.css';
import { Link } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Setting from '../Setting/Setting';
import { ProviderNotifications } from '../contextAPI/ProviderNotification';

//bootstrap icon
import { BiHome } from "react-icons/bi";
import { AiOutlineSetting, AiFillWechat, AiOutlinePhone } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";

const RightSide = () => {
    const [hidden, setHidden] = useState(false)
    const [check, setCheck] = useState(false)
    const [hiddenSetting, setHiddenSetting] = useState(false)
    const { checkNewNoti, setCheckNewNoti } = useContext(ProviderNotifications);
    const hiddenNoti = () => {
        setHidden(!hidden)
        setHiddenSetting(false)
        setCheckNewNoti(0)
    }
    const hiddenST = () => {
        setHiddenSetting(!hiddenSetting)
        setHidden(false)
    }
    const selectChat = () => {
        setCheck(!check)
    }
    return (
        <div className='RightSideChat'>
            <div className='RightSide'>
                <div className='rs-Icon'>
                    <span><Link to='/Home'><BiHome /></Link></span>
                    <span><Link to='/Home'><GrLanguage /></Link></span>
                    <span className='rs-notification'>
                        <span onClick={hiddenNoti}><IoNotifications /></span>
                        <span className={checkNewNoti > 0 ? 'nt-count' : 'hiddenNt-count'}>{checkNewNoti}</span>
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

            <div className="sy-whatshelp">
                <div className={!check ? 'hiddenNt-count' : "sywh-services listSelectChat"}>
                    <div className='Link chat'>
                        <Link to='/Chat'>
                            <BsChatDots className='iconChat' />
                        </Link>
                    </div>
                    <div className='Link call'>
                        <Link to=''>
                            <AiOutlinePhone className='iconChat' />
                        </Link>
                    </div>
                </div>
                <div className='Link selectChat' onClick={selectChat}>
                    <Link to=''>
                        <AiFillWechat className='iconChat' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RightSide