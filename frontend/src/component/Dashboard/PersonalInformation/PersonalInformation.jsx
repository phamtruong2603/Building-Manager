import React, { useEffect, useState } from 'react';
import './ChangeInfor.css';
import ChangePass from '../ChangePass/ChangePass';
import { useDispatch, useSelector } from 'react-redux';
import { userSlector, changeUser } from '../../../redux/reducer/userReducer';
// import { callApiFormdata } from '../../../API/callAPI';
import { updateDetailUser } from '../../auth/authReducer';

const PersonalInformation = () => {
  const [file, setFile] = useState()
  const [updateUser, setUpdateUser] = useState({})
  const [result, setResult] = useState()
  const formData = new FormData();
  const data = useSelector(userSlector);
  const user = data.data
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdateUser(user)
    setResult(user.avatar);
  }, [user])

  const setPrams = (e) => {
    let name = e.target.name
    let value = e.target.value
    setUpdateUser({
      ...updateUser,
      [name]: value,
    })
  }
  const uploader = (event) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setResult(event.target.result);
    };
    setFile(event.target.files[0])
    reader.readAsDataURL(event.target.files[0]);
  }

  const submit = async (e) => {
    e.preventDefault()
    formData.append('avatar', file);
    formData.append('fullName', updateUser.fullName);
    formData.append('dateOfBirth', updateUser.dateOfBirth);
    formData.append('cardNumber', updateUser.cardNumber);
    formData.append('phoneNumber', updateUser.phoneNumber);
    formData.append('sex', updateUser.sex);
    formData.append('haveMotorbike', updateUser.haveMotorbike);
    // const check = await callApiFormdata('/updateUser', 'PUT', formData)
    const check = await updateDetailUser(formData)
    console.log(check)
    if (check.success) {
      dispatch(changeUser(check.data))
      alert('Thay đổi thành công')
    }
  }

  return (
    <div className='changeUser'>
      <form method='POST' onSubmit={submit} >
        <div className='mainChangeInfor'>
          <div className='changeAvatar'>
            <input
              type="file"
              id='avatar'
              onChange={(e) => uploader(e)}
              name='postImg'
            />
            <label htmlFor="avatar">
              {result && <img src={result} alt="" />}
            </label>
          </div>
          <div className='ChangeInforMain'>
            <div className='ChangeInfor'>
              <label htmlFor="fullName">Họ và tên:</label>
              <input type="text" id="fullName" value={updateUser.fullName || ''} name="fullName" onChange={setPrams} />
            </div>

            <div className='ChangeInfor'>
              <label htmlFor="dateOfBirth">Ngày sinh:</label>
              <input type="date" id="dateOfBirth" value={updateUser.dateOfBirth || ''} name="dateOfBirth" onChange={setPrams} />
            </div>

            <div className='ChangeInfor'>
              <label htmlFor="cardNumber">Số CMND:</label>
              <input type="text" id="cardNumber" value={updateUser.cardNumber || ''} name="cardNumber" onChange={setPrams} />
            </div>

            <div className='ChangeInfor'>
              <label htmlFor="phoneNumber">Số điện thoại:</label>
              <input type="text" id="phoneNumber" value={updateUser.phoneNumber || ''} name="phoneNumber" onChange={setPrams} />
            </div>

            <div className='ChangeInforRadio'>
              <span>Giới tính: </span>
              <input type="radio" id='nam' name="sex" value="Nam" onChange={setPrams} />
              <label htmlFor="nam">Nam</label>

              <input type="radio" id='nu' name="sex" value="Nữ" onChange={setPrams} />
              <label htmlFor="nu">Nữ</label>
            </div>

            <div className='ChangeInforRadio'>
              <span>Xe máy: </span>
              <input type="radio" id='yes' name="haveMotorbike" value={true} onChange={setPrams} />
              <label htmlFor="yes">Có</label>

              <input type="radio" id='no' name="haveMotorbike" value={false} onChange={setPrams} />
              <label htmlFor="no">Không</label>
            </div>
            <button className='button ChangeInforBt' type="submit">save</button>
          </div>
        </div>
      </form>
      <div className='ChangePassword'>
        <ChangePass />
      </div>
    </div>
  )
}

export default PersonalInformation