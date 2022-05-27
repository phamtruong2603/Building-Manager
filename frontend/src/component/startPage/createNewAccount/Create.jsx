import React, { useState } from 'react';
import { BiLockAlt, BiUser as UserIcons } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";
import axios from 'axios';

const Create = () => {
  const [dataUser, setDataUser] = useState({});

  //sử lí sự kiện đăng kí
  const CreateUser = async (req) => {
    try {
      let data = await axios.post('/register', { ...req, isAdmin: false })
      if (data.data.success) {
        setDataUser({})
        alert('Tạo tài khoản thành công!')
      }
    } catch (error) {
      console.log(error)
      alert('Tài khoản đã tồn tại!')
      setDataUser({})
    }
  }

  //lấy dữ liệu từ form đăng kí
  const setPrams = (e) => {
    let name = e.target.name
    let value = e.target.value
    setDataUser({
      ...dataUser,
      [name]: value,
    })
  }

  // sự kiện đăng kí 
  const submit = (e) => {
    e.preventDefault()
    CreateUser(dataUser)
  }
  return (
    <div>
      <h2 className="h2">Create New Account</h2>

      <form className="from" method='POST' onSubmit={submit}>
        <div className="label">
          <label htmlFor="phoneNumber"><UserIcons /></label>
          <input type="text" id="phoneNumber" value={dataUser.phoneNumber || ''} placeholder="phoneNumber" name="phoneNumber" onChange={setPrams} />
        </div>

        <div className="label">
          <label htmlFor="password"><BiLockAlt /></label>
          <input type="password" id="password" value={dataUser.password || ''} placeholder="Password" name="password" onChange={setPrams} />
        </div>

        <div className="label">
          <label htmlFor="room"><AiOutlineNumber /></label>
          <input type="text" id="room" value={dataUser.roomID || ''} placeholder="room" name="roomID" onChange={setPrams} />
        </div>

        <button className="bt_signin" type="submit">Continue</button>

        <div className="br_signin">
          <div>0 0 0</div>
        </div>
      </form>
    </div>
  )
}

export default Create