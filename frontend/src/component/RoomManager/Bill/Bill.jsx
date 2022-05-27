import React, { useState } from 'react';
import './BillCss.css';
import CreateBill from './CreateBill/CreateBill';
import GetBill from './GetBill/GetBill';

const Bill = () => {
  const [check, setCheck] = useState(false)
  const click = () => {
    setCheck(!check)
  }
  
  return (
    <div className='Bill'>
      <CreateBill />
      <button onClick={click}>Xem trước hóa đơn</button>
      <div className={check ? '' : 'hidenGetBill'}>
        <GetBill />
      </div>
    </div>
  )
}

export default Bill