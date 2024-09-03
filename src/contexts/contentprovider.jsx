import { createContext, useContext } from "react";
import { useState } from "react";


const stateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setIsAdmin: () => {} // Add any additional context functions here
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, setNotification] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Example for managing admin state

    const notify = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 5000);
    };

    const handleTokenChange = (token) => {
        setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <stateContext.Provider value={{
            user,
            token,
            notification,
            setUser,
            setToken: handleTokenChange,
            setNotification: notify,
            setIsAdmin,
            isAdmin // Pass admin state to context
        }}>
            {children}
        </stateContext.Provider>
    );
}

export const useStateContext = () => useContext(stateContext);