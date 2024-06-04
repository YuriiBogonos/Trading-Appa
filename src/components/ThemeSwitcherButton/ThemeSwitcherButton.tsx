import { useState } from 'react';

import './ThemeSwitcherButton.scss';

function ThemeSwitcherButton() {
  const [isNight, setIsNight] = useState(() => {
    const savedTheme = localStorage.getItem('isNight');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    setIsNight((prevIsNight: boolean) => {
      const newIsNight = !prevIsNight;
      localStorage.setItem('isNight', JSON.stringify(newIsNight));
      return newIsNight;
    });
    document.body.classList.toggle('night-theme', !isNight);
    document.body.classList.toggle('day-theme', isNight);
  };

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
}

export default ThemeSwitcherButton;
