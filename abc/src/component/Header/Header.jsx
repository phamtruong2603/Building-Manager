import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HeaderCss.css';
import { Providers } from '../contextAPI/Provider';
import { IoNotifications } from "react-icons/io5";
import { ProviderSwitchModes } from '../contextAPI/ProviderSwitchMode';

const Header = () => {
    const { them, setThem } = useContext(ProviderSwitchModes);
    const [right, setRight] = useState('left');
    const { user, dispatch } = useContext(Providers);
    const roomID = user?.data?.room?.roomID
    const navigate = useNavigate();

    const SwitchMode = () => {
        setThem(them === 'light' ? 'dark' : 'light')
        setRight(right === 'left' ? 'right' : 'left')
    }

    const LogOut = () => {
        localStorage.removeItem('token');
        dispatch({
            type: 'login',
            payload: {},
        })
        navigate('/');
    }

    return (
        <div className='header'>
            <div className='logoHeader'>
                <div className='Information'>
                    <ul>
                        <li><Link to='/Home'>Home</Link></li>
                        <li><Link to='/Dashboard'>Personal</Link></li>
                        <li>
                            {user?.data?.isAdmin ?
                                <Link to='/Room'>Room</Link>
                                :
                                <Link to={`/Room/${roomID}`}>Room</Link>
                            }
                        </li>
                        <li><Link to='/About'>About</Link></li>
                    </ul>
                </div>
                <div className='setting'>
                    <ul>
                        <li className='settingSwitch' onClick={SwitchMode}>
                            <i className={right}></i>
                        </li>
                        {/* Notification */}
                        <li className='settingNoti'>
                            <Link to={`/Notification`}><IoNotifications /></Link>
                        </li>
                        <li className='settingLogOut' onClick={LogOut}>Log Out</li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Header