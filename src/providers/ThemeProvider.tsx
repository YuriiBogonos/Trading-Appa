import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isNight: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isNight: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isNight, setIsNight] = useState(() => {
    const savedTheme = localStorage.getItem('isNight');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    document.body.classList.toggle('night-theme', isNight);
    document.body.classList.toggle('day-theme', !isNight);
  }, [isNight]);

  const toggleTheme = () => {
    setIsNight((prevIsNight: boolean) => {
      const newIsNight = !prevIsNight;
      localStorage.setItem('isNight', JSON.stringify(newIsNight));
      return newIsNight;
    });
  };

  return <ThemeContext.Provider value={{ isNight, toggleTheme }}>{children}</ThemeContext.Provider>;
};
