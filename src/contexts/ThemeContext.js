import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Set dark mode as the default theme
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Initialize theme from localStorage (if available)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Only change from default if explicitly set to light
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // If no saved preference or it's 'dark', save dark as default
      localStorage.setItem('theme', 'dark');
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };
  
  // Define theme object with default values
  const theme = {
    type: isDarkMode ? 'dark' : 'light',
    primary: '#316a8c',
    secondary: '#488fb0',
    text: isDarkMode ? '#ffffff' : '#333333',
    background: isDarkMode ? '#1a1a1a' : '#ffffff',
    cardBackground: isDarkMode ? '#2d2d2d' : '#ffffff',
    heading: isDarkMode ? '#ffffff' : '#333333',
    shadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    shadowDarker: isDarkMode ? '0 8px 12px rgba(0, 0, 0, 0.2)' : '0 8px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: '12px',
    gradient: isDarkMode ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)'
  };

  // Value to be provided by the context
  const value = {
    theme,
    isDarkMode,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
