import React, { useState } from 'react';
import './ChangePass.css';
import { callApi } from '../../../API/callAPI';

const ChangePass = () => {
    const [pas, setPas] = useState({})
    const [check, setCheck] = useState(true)

    // lấy dữ liệu từ form thay đổi password
    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setPas({
            ...pas,
            [name]: value
        })
    }

    // thay đổi mật khẩu
    const submit = async (e) => {
        e.preventDefault()
        let pass = await callApi('http://localhost:3001/changePW', 'PUT', pas)

        if (pass.data.success) {
            setCheck(true)
            alert('Thay đổi mật khẩu thành công!')
        }
        else {
            setCheck(false)
        }
    }

    return (
        <div>
            <form action="" method='post' onSubmit={submit}>
                <div className='ChangePass'>
                    <label htmlFor="password">Mật khẩu cũ</label>
                    <input type="password" id="password" name="password" onChange={setPrams} />
                </div>

                <div className='ChangePass'>
                    <label htmlFor="NewPassword">Mật khẩu mới</label>
                    <input type="password" id="NewPassword" name="newPassword" onChange={setPrams} />
                </div>
                <p className={!check ? 'ChangePassP' : 'ChangePassPHiden'}>Sai mật khẩu ban đầu</p>
                <button className='button ChangePassBt' type='submit'>save</button>
            </form>
        </div>
    )
}

export default ChangePass