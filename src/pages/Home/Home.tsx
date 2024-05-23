import { Link } from 'react-router-dom';

import ThemeSwitcherButton from '@/components/ThemeSwitcherButton/ThemeSwitcherButton.tsx';

import './Home.scss';

function Home() {
  return (
    <div className='home'>
      <header>
        <div className='leftside-content'>
          <p>Logo</p>
          <ThemeSwitcherButton />
        </div>

        <div className='menu'>
          <nav>
            <ul>
              <li>Key Features</li>
              <li>Top miners</li>
              <li>Menu item</li>
            </ul>
          </nav>
        </div>
        <div className='registration'>
          <Link to='/signup'>
            <button>Register</button>
          </Link>
        </div>
      </header>
      <hr />
      <div className='content'></div>
    </div>
  );
}

export default Home;
