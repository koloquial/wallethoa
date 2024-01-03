import React, { useContext, useState } from 'react';

const AccountContext = React.createContext();

export const useAccount = () => {
    return useContext(AccountContext);
}

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();
    const [active, setActive] = useState();
    
    const func = (arg1, arg2) => {
        console.log('a function');
    }

    const value = {
        account,
        setAccount,
        active,
        setActive,
        func
    }

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    )
}
