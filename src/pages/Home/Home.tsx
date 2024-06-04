import { useNavigate } from 'react-router-dom';

import AboutUs from '@/components/AboutUs/AboutUs.tsx';
import KeyFeatureCard from '@/components/FeaturesCard/FeaturesCard.tsx';
import Footer from '@/components/Footer/Footer.tsx';
import Header from '@/components/Header/Header.tsx';
import MinerDashboard from '@/pages/Home/components/MinerDashboard/MinerDashboard.tsx';
import TradingNetworkDisplay from '@/pages/Home/components/TraidingNetworkBlock/TraidingNetwork.tsx';
import { keyFeatures } from '@/pages/Home/components/keyFeatures.ts';

import FirstBubble from '../../images/BackgroundFigures/First.svg';
import FourBubble from '../../images/BackgroundFigures/Four.svg';
import SecondBubble from '../../images/BackgroundFigures/Second.svg';
import ThirdBubble from '../../images/BackgroundFigures/Third.svg';
import Bittensor from '../../images/Banner/Bittensor.svg';
import DeltaIcon from '../../images/Banner/DeltaDeFi.svg';
import TaoshiIcon from '../../images/Banner/Taoshi.svg';
import './Home.scss';

function Home() {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/signup');
  };
  return (
    <div className='home'>
      <Header />
      <img
        style={{ position: 'absolute', top: '1%', right: '5%', zIndex: 0 }}
        src={SecondBubble}
        alt='icon'
      />
      <img style={{ position: 'absolute' }} src={ThirdBubble} alt='icon' />
      <div className='home-content'>
        <div className='content'>
          <img
            style={{ position: 'absolute', top: '90%', left: '21%' }}
            src={FirstBubble}
            alt='icon'
          />
          <img
            style={{ position: 'absolute', top: '80%', right: '20%' }}
            src={FourBubble}
            alt='icon'
          />
          <div className='banner'>
            <img src={DeltaIcon} alt='delta' />
            <img src={TaoshiIcon} alt='taoshi' />
            <img src={Bittensor} alt='bitternsor' />
          </div>
          <div className='title'>
            <p>Delta De-Fi's TaoshiTrader</p>
            <span>Register - Trade - Earn Rewards Daily</span>
            <button>SIGN UP</button>
          </div>
        </div>
        <div>
          <TradingNetworkDisplay />
        </div>
        <h2 className='features-title'>How it Works</h2>
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
        <div className='home-dashboard-title'>Trader Dashboard</div>

        <div className='home-dashboard'>
          <div className='home-dashboard-banner'>
            <p>Integration with Trader View</p>
            <p>
              USD <span className='price'>$175,000</span> Total Daily Reward Distribution
            </p>
            <p>
              <span className='price'>$2,900</span> avg Daily per Trader
            </p>
          </div>

          <MinerDashboard />
        </div>
        <div className='aboutus'>
          <h2 className='features-title'>About Us</h2>
          <AboutUs />
        </div>
        <div className='ready'>
          <h2 className='ready-title'>
            Ready to <span className='highlight'>Maximize</span> Your Trading Profits?
          </h2>

          <p>
            Become a part of PTN's exclusive community and gain access to cutting-edge Delta De-Fi
            signals designed to maximize your trading profits.
          </p>
          <div className='ready-join'>
            <button>JOIN US NOW</button>
            <span>
              Registration includes access to our V1 SignalBot boasting a 76% Win/Loss rate*
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
