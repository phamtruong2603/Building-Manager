import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { postNoti } from '../auth/notification';

export const socket = io.connect('http://localhost:2603')

export const ProviderSockets = React.createContext();
const ProviderSocket = ({ children }) => {
    const [socketNoti, setSocketNoti] = useState();

    useEffect(() => {
        socket.on('notificationServerPush', (data) => {
            setSocketNoti(data)
            postNoti(data)
        })
    }, [])
    const data = { socket, socketNoti }
    return (
        <ProviderSockets.Provider value={data}>
            {children}
        </ProviderSockets.Provider>
    )
}

export default ProviderSocket