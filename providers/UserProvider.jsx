import React from 'react'

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: "",
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}