import React, { useContext } from 'react';
import './Users.css';
import { ProviderUsers } from '../../contextAPI/ProviderUser';

const User = () => {
    const { dataUser } = useContext(ProviderUsers)

    // biến avatar người dùng
    let avatar = dataUser?.avatar
        ? dataUser.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'

    return (
        <div className='user'>
            <div className='avatarUser'>
                <img src={avatar} alt="" />
            </div>
            <ul>
                <li>Họ và tên : {dataUser?.fullName ? dataUser.fullName : '*'}</li>
                <li>Ngày sinh : {dataUser?.dateOfBirth ? dataUser.dateOfBirth : '*'}</li>
                <li>Số CMND : {dataUser?.cardNumber ? dataUser.cardNumber : '*'}</li>
                <li>Số điện thoại : {dataUser?.phoneNumber ? dataUser.phoneNumber : '*'}</li>
                <li>Giới tính : {dataUser?.sex ? dataUser.sex : '*'}</li>
                <li>Xe máy : {dataUser?.haveMotorbike ? dataUser.haveMotorbike : '*'}</li>
            </ul>
        </div>
    )
}

export default User