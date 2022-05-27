import React from 'react';
import './SidebarCss.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <ul>
        <li><Link to="/Dashboard">Thông tin và liên hệ</Link></li>
        <li><Link to="/Dashboard/ChangeInformation">Thay đổi thông tin</Link></li>
        <li><Link to="/Dashboard/ChangePassword">Đổi mật khẩu</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar