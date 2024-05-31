import { useNavigate } from 'react-router-dom';

import ThemeSwitcherButton from '@/components/ThemeSwitcherButton/ThemeSwitcherButton.tsx';

import './Header.scss';

function Header() {
  const navigate = useNavigate();
  const handleRouteToSignUp = () => {
    navigate('/signup');
  };
  return (
    <header>
      <div className='leftside-content'>
        <p>Logo</p>
        <ThemeSwitcherButton />
      </div>
      <div className='menu'>
        <nav>
          <ul>
            <li>How it Works</li>
            <li>Top Traders</li>
            <li>About us</li>
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
