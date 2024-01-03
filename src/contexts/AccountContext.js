import React, { useContext, useState } from 'react';

const AccountContext = React.createContext();

export const useAccount = () => {
    return useContext(AccountContext);
}

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();
    const [active, setActive] = useState();
    
    const clearState = () => {
        setAccount();
        setActive();
    }

    const value = {
        account,
        setAccount,
        active,
        setActive,
        clearState
    }

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    )
}
