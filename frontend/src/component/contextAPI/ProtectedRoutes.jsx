import React, { useState } from 'react';

export const ProtectedRoute = React.createContext()

const ProtectedRoutes = ({ children }) => {

    const [privateRoute, setPrivateRoute] = useState(null);

    const data = {privateRoute, setPrivateRoute}

    return (
        <ProtectedRoute.Provider value={data}>
            {children}
        </ProtectedRoute.Provider>
    )
}

export default ProtectedRoutes