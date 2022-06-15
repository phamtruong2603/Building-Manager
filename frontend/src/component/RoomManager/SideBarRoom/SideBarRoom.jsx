import React, { useContext } from 'react';
import './SideBarRoomCss.css';
import { useNavigate } from 'react-router-dom';
import AdminRoom from './AdminRoom/AdminRoom';
import { Providers } from '../../contextAPI/Provider';

const SideBarRoom = () => {
    const navigate = useNavigate()
    const { user } = useContext(Providers)
    const click = () => {
        navigate('/Room/createroom')
    }

    return (
        <div>
            {user?.data?.isAdmin ?
                <div>
                    <div>
                        <button className='button SbR-bt' onClick={click}>Thêm Phòng</button>
                    </div>
                    <div>
                        <AdminRoom />
                    </div>
                </div>
                :
                <p className='SidebarRoomP'>phòng của bạn </p>
            }
        </div>
    )
}

export default SideBarRoom