import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { loginToken, userSlector } from './redux/reducer/userReducer';

const useAuth = user => user.success;

const ProtectedRoutes = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSlector);
    useEffect(() => {
        dispatch(loginToken())
    }, [])
    const isAuth = useAuth(user);
    return (
        !isAuth ? <Navigate to='/' /> : <Outlet />
    )
}

export default ProtectedRoutes
