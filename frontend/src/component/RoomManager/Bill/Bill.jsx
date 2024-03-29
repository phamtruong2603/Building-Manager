import React, { useState } from 'react';
import './BillCss.css';
import CreateBill from './CreateBill/CreateBill';
import GetBill from './GetBill/GetBill';
import { Providers } from '../../contextAPI/Provider';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { userSlector } from '../../../redux/reducer/userReducer';

const Bill = () => {
  const [check, setCheck] = useState(false)
  const data = useSelector(userSlector);
  const user = data.data
  const click = () => {
    setCheck(!check)
  }

  return (
    <div className='Bill'>
      {
        !user?.data?.isAdmin ?
            <GetBill />
          :
          <div className='billAdmin'>
            <CreateBill />
            <button onClick={click}>Xem trước hóa đơn</button>
            <div className={check ? '' : 'hidenGetBill'}>
              <GetBill />
            </div>
          </div>
      }
    </div>
  )
}

export default Bill