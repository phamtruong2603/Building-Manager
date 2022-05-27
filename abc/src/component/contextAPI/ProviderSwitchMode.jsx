import React, { useState } from 'react';

export const ProviderSwitchModes = React.createContext();

const ProviderSwitchMode = ({ children }) => {
    const [them, setThem] = useState('dark');
    const data = { them, setThem }
    return (
        <ProviderSwitchModes.Provider value={data}>
            {children}
        </ProviderSwitchModes.Provider>
    )
}

export default ProviderSwitchMode