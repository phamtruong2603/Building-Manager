import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Providers } from './component/contextAPI/Provider';

const useAuth = (ur) => {
    const user = ur
    return user.success
}

const ProtectedRoutes = () => {
    const { user } = useContext(Providers)
    const isAuth = useAuth(user);
    return (
        !isAuth ? <Navigate to='/' /> : <Outlet />
    )
}

export default ProtectedRoutes