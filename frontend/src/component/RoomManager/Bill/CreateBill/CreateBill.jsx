import React, { useEffect, useState } from 'react';
import './CreateBillCss.css';
import { useParams } from 'react-router-dom'
import { CreateBillID } from '../../../auth/bill';

const CreateBill = () => {
  const [req, setReq] = useState({})
  useEffect(() => {
    setReq({
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1
    })
  }, [])
  const { roomID } = useParams()

  const [data, setData] = useState({
    sent: false,
    paid: false
  })

  //lấy dữ liệu để tạo bill
  const prams = (e) => {
    let name = e.target.name
    let value = e.target.value
    setData({
      ...data,
      [name]: value
    })
  }

  //tạo bill tháng mới. admin có quyền
  const update = async () => {
    let create = await CreateBillID(roomID, data)
    if (!create.success) {
      alert(create.message)
    } else {
      alert('create new bill successfully !!!')
      setData({
        sent: false,
        paid: false
      })
    }
  }
  return (
    <div className='CreateBill'>
      <h4>Thu tiền nhà tháng {req.month}/{req.year} phòng {roomID}</h4>
      <table>
        <thead>
          <tr>
            <th>Phí thu</th>
            <th></th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tiền nhà</td>
            <td>2000000</td>
            <td>1 tháng</td>
          </tr>
          <tr>
            <td>Điện</td>
            <td>
              <input type="text" name='electricNumber' placeholder='Nhập số điện' onChange={prams} />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Nước</td>
            <td>
              <input type="text" name='waterBlockNumber' placeholder='Nhập số nước' onChange={prams} />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Internet</td>
            <td>40000</td>
            <td>1 phòng</td>
          </tr>
          <tr>
            <td>Gửi xe</td>
            <td>20000</td>
            <td>1 phòng</td>
          </tr>
          <tr>
            <td>Vệ sinh </td>
            <td>20000</td>
            <td>1 phòng</td>
          </tr>
        </tbody>
      </table>
      <div className='btCreateBill'>
        <ul>
          <li onClick={update}>Update</li>
        </ul>
      </div>
    </div>
  )
}

export default CreateBill