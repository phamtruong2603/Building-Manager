import React, { useState } from 'react';

export const ProviderNotifications = React.createContext()

const ProviderNotification = ({ children }) => {
    const [noti, setNoti] = useState([])
    const [checkNewNoti, setCheckNewNoti] = useState(0)

    const data = { noti, setNoti, checkNewNoti, setCheckNewNoti }
    return (
        <ProviderNotifications.Provider value={data}>
            {children}
        </ProviderNotifications.Provider>
    )
}

export default ProviderNotification