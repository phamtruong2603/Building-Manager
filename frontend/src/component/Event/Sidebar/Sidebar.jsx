import React, { useContext, useEffect, useState } from 'react';
import './SidebarCss.css';
import { Providers } from '../../contextAPI/Provider';
import { getRoomDetail } from '../../auth/room';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { user } = useContext(Providers);
    const roomID = user?.data?.room?.roomID
    const [data, setData] = useState({})
    const [room, setRoom] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        roomID && (async function () {
            let response = await getRoomDetail(roomID)
            setRoom(response)
        })()
    }, [roomID]);
    const dashboard = () => {
        navigate('/Dashboard')
    }

    const Room = () => {
        let route = user?.data?.isAdmin ? '/Room' : `/Room/${roomID}`
        navigate(route)
    }

    useEffect(() => {
        setData(user.data)
    }, [user])
    let avatar = data?.avatar
        ? data.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'
    return (
        <div className='SidebarHome'>
            <div className='Profile'>
                <div className='backgroundProfile'>
                    <img src="https://anhdep123.com/wp-content/uploads/2020/05/h%C3%ACnh-%E1%BA%A3nh-phong-c%E1%BA%A3nh-%C4%91%E1%BA%B9p.jpg" alt="" />
                </div>
                <div className='ProfileAvatar'>
                    <img
                        src={avatar}
                        alt=""
                    />
                </div>
                <div className='ProfileName'>
                    <p>{data?.fullName ? data?.fullName : 'user'}</p>
                    <p>{data?.phoneNumber ? data?.phoneNumber : ''}</p>
                </div>
                <hr />
                <div className='ProfileText'>
                    <div onClick={Room}
                        style={{ cursor: 'pointer' }}
                    >
                        <span>Phòng</span>
                        <span>{data?.room?.roomName}</span>
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
                {room?.data?.data.users.map((user, index) => {
                    let avatarImg = user.avatar ? user.avatar :
                        'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'
                    return (
                        <div key={index} className='following'>
                            <div>
                                <div className='followingAvatar'>
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className='followingName'>
                                    <p>{user.fullName ? user.fullName : 'user'}</p>
                                </div>
                            </div>
                            <button className='button followingButton'>Follow</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar