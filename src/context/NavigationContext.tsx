import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationContextType {
  navigate: (path: string) => void;
}

// Export the context
export const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationContext.Provider value={{ navigate: handleNavigate }}>
      {children}
    </NavigationContext.Provider>
  );
};