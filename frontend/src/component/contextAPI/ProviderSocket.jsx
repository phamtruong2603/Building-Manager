import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { postNoti } from '../auth/notification';
import { Providers } from './Provider'

const socket = io.connect('http://localhost:2603')

export const ProviderSockets = React.createContext();
const ProviderSocket = ({ children }) => {
    const [socketNoti, setSocketNoti] = useState({})
    const { user } = useContext(Providers);

    useEffect(() => {
        socket.emit('newConnectUser', user?.data?.userID);
    }, [user])

    socket.on('notificationServerPush', (data) => {
        setSocketNoti(data)
    })

    console.log(socketNoti)
    const data = { socket, socketNoti }
    return (
        <ProviderSockets.Provider value={data}>
            {children}
        </ProviderSockets.Provider>
    )
}

export default ProviderSocket