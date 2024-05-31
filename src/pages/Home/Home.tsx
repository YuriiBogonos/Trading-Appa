import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header/Header.tsx';
import { keyFeatures } from '@/pages/Home/components/KeyFeatures/keyFeatures.ts';
import MinerDashboard from '@/pages/Home/components/MinerDashboard/MinerDashboard.tsx';
import TradingNetworkDisplay from '@/pages/Home/components/TraidingNetworkBlock/TraidingNetwork.tsx';

import FirstBubble from '../../images/BackgroundFigures/First.svg';
import FourBubble from '../../images/BackgroundFigures/Four.svg';
import SecondBubble from '../../images/BackgroundFigures/Second.svg';
import ThirdBubble from '../../images/BackgroundFigures/Third.svg';
import './Home.scss';
import KeyFeatureCard from './components/KeyFeatures/KeyFeatures.tsx';

function Home() {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/signup');
  };
  return (
    <div className='home'>
      <Header />
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
            <button>SIGN UP</button>
          </div>
        </div>
        <div>
          <TradingNetworkDisplay />
        </div>
        <h2 className='keyfeatures-title'>How it Works</h2>
        <div className='key-features'>
          {keyFeatures.map((feature, index) => (
            <KeyFeatureCard
              key={index}
              title={feature.title}
              content={feature.content}
              metrics={feature.metrics}
              link={feature.link}
            />
          ))}
        </div>
        <div className='register-button'>
          <button onClick={handleRegisterClick}>Register now</button>
          <span>
            Registration includes access to our V1 SignalBot boasting a 76% Win/Loss rate*
          </span>
        </div>
        <div className='home-dashboard'>
          <div className='home-dashboard-title'>Trader Dashboard</div>
          <MinerDashboard />
        </div>
      </div>
    </div>
  );
}

export default Home;
