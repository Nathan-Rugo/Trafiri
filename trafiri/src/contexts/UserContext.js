// User context stores the user object and a function to update it. 
// This context is used to provide user information to all components in the application. 
// The user object is initialized with a default value of { firstName: 'Guest' }.
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ firstName: 'Guest' });

    return (
        // User context provider to provide user information to all components in the application
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
