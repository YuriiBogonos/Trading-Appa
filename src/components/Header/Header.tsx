import { Link } from 'react-router-dom';

import ThemeSwitcherButton from '@/components/ThemeSwitcherButton/ThemeSwitcherButton.tsx';

import './Header.scss';

function Header() {
  return (
    <header>
      <div className='leftside-content'>
        <p>Logo</p>
        <ThemeSwitcherButton />
      </div>
      <div className='menu'>
        <nav>
          <ul>
            <li>Key Features</li>
            <li>Top Traders</li>
            <li>Menu item</li>
          </ul>
        </nav>
      </div>
      <div className='registration'>
        <Link to='/signup'>
          <button>Register (Beta)</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
