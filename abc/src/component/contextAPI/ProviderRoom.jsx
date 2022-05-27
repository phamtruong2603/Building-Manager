import React, { useState } from 'react';

export const ProviderRooms = React.createContext();

const ProviderRoom = ({ children }) => {
    const [dataRoom, setDataRoom] = useState({})

    const data = { dataRoom, setDataRoom }
    return (
        <ProviderRooms.Provider value={data}>
            {children}
        </ProviderRooms.Provider>
    )
}

export default ProviderRoom