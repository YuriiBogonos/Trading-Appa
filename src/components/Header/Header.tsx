import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ThemeSwitcherButton from '@/components/ThemeSwitcherButton/ThemeSwitcherButton.tsx';

import DarkLogo from '../../images/Logo/DarkLogo.svg';
import LightLogo from '../../images/Logo/LightLogo.svg';
import { ThemeContext } from '../../providers/ThemeProvider.tsx';
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  const handleRouteToSignUp = () => {
    navigate('/signup');
  };
  const { isNight } = useContext(ThemeContext);
  return (
    <header>
      <div className='leftside-content'>
        <NavLink to='/home'>
          <img src={isNight ? DarkLogo : LightLogo} alt='logo' />
        </NavLink>
        <ThemeSwitcherButton />
      </div>
      <div className='menu'>
        <nav>
          <ul>
            <li>How it Works</li>
            <li>Trader Earnings</li>
            <li>About us</li>
            <li>
              <Link to='/faq'>Competition Rules and FAQ</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='registration'>
        <button onClick={handleRouteToSignUp}>Register (Beta)</button>
      </div>
    </header>
  );
}

export default Header;
