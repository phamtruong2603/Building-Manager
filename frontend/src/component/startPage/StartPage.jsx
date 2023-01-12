import React, { useState } from 'react';
import './StartPageCss.css';
import Login from './Login/Login';
import Create from './createNewAccount/Create';

const StartPage = () => {
    let [check, setCheck] = useState(false)
    const Click = () => {
        setCheck(!check)
    }
    return (
        <div className='startPage'>
            {/* header trang login create */}
            <div className='startPageHeader'>
                <ul>
                    <li className='logo'>ABC</li>
                    <li className='create' onClick={Click}>{!check ? 'Create Account' : 'Login'}</li>
                </ul>
            </div>
            {/* login và  create */}
            <div className='startPageForm'>
                {!check ? <Login /> : <Create />}
            </div>
            <div className='startPageFooter'>

            </div>
        </div>
    )
}

export default StartPage