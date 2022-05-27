import React, { useEffect, useReducer } from 'react';
import { getDetailUser } from '../auth/authReducer';
import { authReducer } from '../auth/authReducer';

export const ProviderUsers = React.createContext();

const ProviderUser = ({ children }) => {
    const [dataUser, dispatch] = useReducer(authReducer, {})
    
    useEffect(() => {
        (async function () {
            let response = await getDetailUser()
            dispatch({
                type: "update",
                payload: response,
            })
        })()
    }, [])

    const data = { dataUser, dispatch }
    return (
        <ProviderUsers.Provider value={data}>
            {children}
        </ProviderUsers.Provider>
    )
}

export default ProviderUser