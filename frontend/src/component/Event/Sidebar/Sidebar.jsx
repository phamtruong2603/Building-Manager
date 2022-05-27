import React, { useContext, useEffect, useState } from 'react';
import './SidebarCss.css';
import { Providers } from '../../contextAPI/Provider';
import { AiOutlineNumber } from "react-icons/ai";

const Sidebar = () => {
    const { user } = useContext(Providers);
    const [data, setData] = useState({})
    useEffect(() => {
        setData(user.data)
    }, [user])

    return (
        <div className='SidebarHome'>
            <div className='SidebarUser'>
                <div className='SidebarUserAvarta'>
                    <img src="https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png" alt="" />
                </div>
                <p>{data?.fullName ? data?.fullName : 'user'}</p>
            </div>
            <div className='SidebarUser'>
                <div className='SidebarUserRoom'><AiOutlineNumber /></div>
                <p>{data?.room?.roomName}</p>
            </div>
            {/* <div className='SidebarPost'>Chung</div>
            <div className='SidebarPost'>Bài viết của bạn</div> */}
        </div>
    )
}

export default Sidebar