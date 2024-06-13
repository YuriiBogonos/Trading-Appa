import React, { useContext } from 'react';

import { ThemeContext } from '../../providers/ThemeProvider.tsx';
import './ThemeSwitcherButton.scss';

const ThemeSwitcherButton: React.FC = () => {
  const { isNight, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={`theme ${isNight ? 'night' : 'day'}`} onClick={toggleTheme}>
      <div className='icon-wrapper'>
        <div className='icon-border'>
          <div className={`icon ${isNight ? 'icon-day' : 'icon-night'}`}></div>
        </div>
      </div>
      <p className={`theme-text ${isNight ? 'padding-night' : 'padding-day'}`}>
        {isNight ? 'Day' : 'Night'}
      </p>
    </button>
  );
};

export default ThemeSwitcherButton;
