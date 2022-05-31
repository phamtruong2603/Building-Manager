import React from 'react';

export const ProviderSockets = React.createContext();

const ProviderSocket = ({ children }) => {
    const data = {}
    return (
        <ProviderSockets.Provider value={data}>
            {children}
        </ProviderSockets.Provider>
    )
}

export default ProviderSocket