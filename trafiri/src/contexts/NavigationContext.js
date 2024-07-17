// Navigation context to handle navigation between pages in the application using the window.location.href property.
import React, { createContext, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navigateTo = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.href = path;
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
