import React from 'react';
import { useTheme } from './ThemeContext';
import './App.css';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="card">
        <h1>{isDarkMode ? 'Dark Theme' : 'Light Theme'}</h1>
        <p>Current theme state: <strong>{isDarkMode ? 'true' : 'false'}</strong></p>
        <button onClick={toggleTheme} className="toggle-button">
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

export default App;
