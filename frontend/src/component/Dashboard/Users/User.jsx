import React from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSlector } from '../../../redux/reducer/userReducer';

const User = () => {
    const user = useSelector(userSlector).data
    const navigate = useNavigate()
    // biến avatar người dùng
    let avatar = user?.avatar
        ? user.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'

    const updateUser = () => {
        navigate('/Dashboard/ChangeInformation')
    }
    return (
        <div className='user'>
            <div className='avatarUser'>
                <img src={avatar} alt="" />
            </div>
            <ul>
                <li>Họ và tên : {user?.fullName ? user.fullName : '*'}</li>
                <li>Ngày sinh : {user?.dateOfBirth ? user.dateOfBirth : '*'}</li>
                <li>Số CMND : {user?.cardNumber ? user.cardNumber : '*'}</li>
                <li>Số điện thoại : {user?.phoneNumber ? user.phoneNumber : '*'}</li>
                <li>Giới tính : {user?.sex ? user.sex : '*'}</li>
                <li>Xe máy : {user?.haveMotorbike ? user.haveMotorbike : '*'}</li>
                <li>
                    <button className='button user-button' onClick={updateUser}>Update</button>
                </li>
            </ul>
        </div>
    )
}

export default User