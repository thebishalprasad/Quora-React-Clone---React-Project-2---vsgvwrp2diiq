import { createContext, useContext, useState,useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };


    const onTokenHandler = (data) => {
        setToken(data);
    }

    const object = {
        theme,toggleTheme
    }


    return (<div>
        <UserContext.Provider value={object}>
            {children}
        </UserContext.Provider>
    </div>)
}

export function useUser() {
    return useContext(UserContext);
}