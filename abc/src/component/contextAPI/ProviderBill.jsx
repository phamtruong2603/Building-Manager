import React from 'react';
export const ProviderBills = React.createContext();

const ProviderBill = ({ children }) => {
    const data = {}
    return (
        <ProviderBills.Provider value={data}>
            {children}
        </ProviderBills.Provider>
    )
}

export default ProviderBill