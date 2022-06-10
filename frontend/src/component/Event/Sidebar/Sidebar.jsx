import React, { useContext, useEffect, useState } from 'react';
import './SidebarCss.css';
import { Providers } from '../../contextAPI/Provider';
import { ProviderUsers } from '../../contextAPI/ProviderUser';
import { getRoomDetail } from '../../auth/room';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { user } = useContext(Providers);
    const roomID = user?.data?.room?.roomID
    const [data, setData] = useState({})
    const [room, setRoom] = useState({})
    const { dataUser } = useContext(ProviderUsers);
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            let response = await getRoomDetail(data?.room?.roomID)
            setRoom(response)
        })()
    }, [data]);

    const dashboard = () => {
        navigate('/Dashboard')
    }

    const Room = () => {
        let x = user?.data?.isAdmin ? '/Room' : `/Room/${roomID}`
        navigate(x)
    }

    // biến avatar người dùng
    let avatar = dataUser?.avatar
        ? dataUser.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'

    useEffect(() => {
        setData(user.data)
    }, [user])

    return (
        <div className='SidebarHome'>
            <div className='Profile'>
                <div className='backgroundProfile'>
                    <img src="https://anhdep123.com/wp-content/uploads/2020/05/h%C3%ACnh-%E1%BA%A3nh-phong-c%E1%BA%A3nh-%C4%91%E1%BA%B9p.jpg" alt="" />
                </div>
                <div className='ProfileAvatar'>
                    <img src={avatar} alt="" />
                </div>
                <div className='ProfileName'>
                    <p>{data?.fullName ? data?.fullName : 'user'}</p>
                    <p>Năm Sinh</p>
                </div>
                <hr />
                <div className='ProfileText'>
                    <div onClick={Room}
                        style={{ cursor: 'pointer' }}
                    >
                        <span>Phòng</span>
                        <span>{room?.data?.data.roomName}</span>
                    </div>
                    <div className='seperate'></div>
                    <div>
                        <span>Thành viên</span>
                        <span>{room?.data?.data.users.length}</span>
                    </div>
                </div>
                <hr />
                <div className='MyProfile'>
                    <span onClick={dashboard}>My Profile</span>
                </div>
            </div>
            <div>
                <h4>Who suggested following?</h4>
                <div className='following'>
                    <div>
                        <div className='followingAvatar'>
                            <img src="https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png" alt="" />
                        </div>
                        <div className='followingName'>
                            <p>{data?.fullName ? data?.fullName : 'user'}</p>
                        </div>
                    </div>
                    <button className='button followingButton'>Follow</button>
                </div>
                <div className='following'>
                    <div>
                        <div className='followingAvatar'>
                            <img src="https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png" alt="" />
                        </div>
                        <div className='followingName'>
                            <p>{data?.fullName ? data?.fullName : 'user'}</p>
                        </div>
                    </div>
                    <button className='button followingButton'>Follow</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar