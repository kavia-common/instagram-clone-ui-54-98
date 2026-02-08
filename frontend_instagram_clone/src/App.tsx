import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main App component with theme toggle functionality
 * Provides routing context for the entire application
 */
const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = (): void => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div className="text-4xl font-bold mb-4">
            Instagram Clone
          </div>
          <p className="text-lg">
            TypeScript + Tailwind CSS + React Router Setup Complete
          </p>
          <p className="mt-4">
            Current theme: <strong>{theme}</strong>
          </p>
        </header>
      </div>
    </BrowserRouter>
  );
};

export default App;
