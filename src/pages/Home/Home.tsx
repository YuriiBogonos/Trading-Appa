import { Link } from 'react-router-dom';

import ThemeSwitcherButton from '@/components/ThemeSwitcherButton/ThemeSwitcherButton.tsx';
import { keyFeatures } from '@/pages/Home/components/KeyFeatures/keyFeatures.ts';
import TradingNetworkDisplay from '@/pages/Home/components/TraidingNetworkBlock/TraidingNetwork.tsx';

import FirstBubble from '../../images/BackgroundFigures/First.svg';
import FourBubble from '../../images/BackgroundFigures/Four.svg';
import SecondBubble from '../../images/BackgroundFigures/Second.svg';
import ThirdBubble from '../../images/BackgroundFigures/Third.svg';
import './Home.scss';
import KeyFeatureCard from './components/KeyFeatures/KeyFeatures.tsx';

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
      <img
        style={{ position: 'absolute', top: '0', right: '3%', zIndex: 0 }}
        src={SecondBubble}
        alt='icon'
      />
      <img style={{ position: 'absolute' }} src={ThirdBubble} alt='icon' />
      <div className='home-content'>
        <div className='content'>
          <img
            style={{ position: 'absolute', top: '70%', left: '15%' }}
            src={FirstBubble}
            alt='icon'
          />
          <img
            style={{ position: 'absolute', top: '70%', right: '14%' }}
            src={FourBubble}
            alt='icon'
          />

          <div className='title'>
            <p>Delta De-Fi's TaoshiTrader</p>
            <span>Register - Trade - Earn Rewards Daily</span>
            <button>EXPLORE NOW</button>
          </div>
        </div>
        <div>
          <TradingNetworkDisplay />
        </div>
        <h2 className='keyfeatures-title'>Key Features</h2>
        <div className='key-features'>
          {keyFeatures.map((feature, index) => (
            <KeyFeatureCard
              key={index}
              title={feature.title}
              content={feature.content}
              description={feature.description}
              metrics={feature.metrics}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
