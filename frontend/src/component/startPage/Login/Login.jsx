import React, { useContext, useEffect, useState } from 'react';
import './LoginCss.css';
import { BiLockAlt, BiUser as UserIcons } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { Providers } from '../../contextAPI/Provider';
import { loginForm } from '../../auth/authReducer';

const Login = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(Providers);
    const [dataUser, setDataUser] = useState();
    const [checkBad, setCheckBad] = useState(true);

    // lấy dữ liệu từ form đăng nhập
    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setDataUser({
            ...dataUser,
            [name]: value,
        })
    }

    //trong thời gian token còn hạn. 
    //tự động đến trang home
    useEffect(() => {
        if (user?.success) {
            navigate('/Home');
        }
    })

    //sự kiện đăng nhập(login)
    const submit = async (e) => {
        e.preventDefault()
        let data = await loginForm(dataUser)

        //check tài khoản mật khẩu
        if (!data.data.success) {
            setCheckBad(false)
        } else {
            setCheckBad(true)
            dispatch({
                type: 'login',
                payload: data,
            })
        }
    }
    return (
        <div className='login'>
            <h2 className="h2">Login</h2>

            <form className="from" method='POST' onSubmit={submit}>
                <div className="label">
                    <label htmlFor="phoneNumber"><UserIcons /></label>
                    <input type="text" id="phoneNumber" placeholder="phoneNumber" name="phoneNumber" onChange={setPrams} />
                </div>

                <div className="label">
                    <label htmlFor="password"><BiLockAlt /></label>
                    <input type="password" id="password" placeholder="Password" name="password" onChange={setPrams} />
                </div>

                <button className="bt_signin" type="submit">LOGIN</button>
                <p className={!checkBad ? 'badForm' : 'badFormHiden'}>Sai tài khoản, mật khẩu</p>

                <div className="forgotPass">
                    <Link to="">Forgot password?</Link>
                </div>

                <div className="br_signin">
                    <div>0 0 0</div>
                </div>
            </form>
        </div>
    )
}

export default Login
