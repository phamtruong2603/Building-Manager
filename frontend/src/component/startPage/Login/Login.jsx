import React, { useEffect, useState } from 'react';
import './LoginCss.css';
import { BiLockAlt, BiUser as UserIcons } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { login, loginToken, userSlector } from '../../../redux/reducer/userReducer';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const user = useSelector(userSlector)
    const dispatch = useDispatch()
    const [dataUser, setDataUser] = useState();

    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setDataUser({
            ...dataUser,
            [name]: value,
        })
    }
    useEffect(() => {
        dispatch(loginToken())
    }, [])
    useEffect(() => {
        if (user?.success) {
            navigate('/Home');
        }
    }, [user])

    const submit = (e) => {
        e.preventDefault()
        dispatch(login(dataUser))
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
