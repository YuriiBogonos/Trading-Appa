import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import KeyFeatureCard from '@/components/FeaturesCard/FeaturesCard.tsx';
import Footer from '@/components/Footer/Footer.tsx';
import Header from '@/components/Header/Header.tsx';
import BannerDelta from '@/components/icons/BannerDelta.tsx';
import Telegram from '@/components/icons/Telegram.tsx';
import AlphaCornerDarkBackground from '@/images/AlphaCorner/AlphaCornerDarkBackground.png';
import AlphaCornerDayBackground from '@/images/AlphaCorner/AlphaCornerDayBackground.png';
import DarkBottom from '@/images/BackgroundFigures/DarkBottom.png';
import LightBottom from '@/images/BackgroundFigures/LightBottom.png';
import ArrowBanner from '@/images/Banner/ArrowBanner.svg';
import Bittensor from '@/images/Banner/Bittensor.svg';
import ConcatIcon from '@/images/Banner/ConcatIcon.svg';
import TaoshiIcon from '@/images/Banner/TaoshiBanner.svg';
import TraderDasboard from '@/images/TraderDashboard.svg';
import MinerDashboard from '@/pages/Home/components/MinerDashboard/MinerDashboard.tsx';
import SignalsCardsList from '@/pages/Home/components/SignalsCardsList/SignalsCardsList.tsx';
import { keyFeatures } from '@/pages/Home/components/keyFeatures.ts';
import { StarIcon } from '@/pages/Rules/components/StarIcon/StarIcon.tsx';

import { ThemeContext } from '../../providers/ThemeProvider.tsx';
import './Home.scss';

function Home() {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/signup');
  };

  const { isNight } = useContext(ThemeContext);
  const fill = isNight ? 'white' : 'black';
  return (
    <div className='home'>
      <Header />
      <div className='home-content'>
        <div className='content'>
          <div className='content-left'>
            <div className='banner'>
              <BannerDelta isNight={isNight} />
              <img src={ConcatIcon} alt='ConcatIcon' />
              <img src={TaoshiIcon} alt='TaoshiIcon' />
            </div>
            <div className='title'>
              <p>Proof of Work has never been so valuable.</p>
              <span>
                Introducing the first blockchain based Proprietary Trading Competition hosted in the
                Bittensor AI neural network. The world's best traders in a head-to-head, simulated
                environment, taking home outsized rewards.
              </span>
              <button onClick={handleRegisterClick}>SIGN UP</button>
            </div>
          </div>
          <div className='content-right'>
            <img src={Bittensor} alt='Bittensor' className='bittensor' />
            <img src={ArrowBanner} alt='Arrow' className='arrow' />
            <p>Powered by</p>
          </div>
        </div>

        <h2 className='features-title'>How it Works</h2>
        <div className='key-features'>
          {keyFeatures.map((feature, index) => (
            <KeyFeatureCard key={index} link={feature.link}>
              <div className='card-icon'>
                <img src={feature.icon} alt='icon' />
              </div>
              <h2 className='card-title'>{feature.title}</h2>
              <div className='card-content'>
                <p>{feature.content}</p>
              </div>
            </KeyFeatureCard>
          ))}
        </div>
        <div className='register-button'>
          <button onClick={handleRegisterClick}>Register now</button>
          <span>Registration includes Alpha Corner tools including our V1 Signal Bot</span>
        </div>
        <h2 className='features-title'>Trader Dashboard</h2>
        <div className='trader-dashboard'>
          <div className='trader-img'>
            <img src={TraderDasboard} alt='traderDashboard' />
          </div>
        </div>
        <div className='home-dashboard-title'>
          Trader Earnings
          <div className='tao-price'>TAO/USD = $322.50</div>
        </div>
        <div className='home-dashboard'>
          <div className='home-dashboard-banner'>
            <p>
              <StarIcon isActive={true} />
              USD <span className='price'>$80,000</span> in Total Daily Rewards
            </p>
            <p>
              <StarIcon isActive={true} />
              <span className='price'>&gt;$8,000</span> paid out daily to Top Trader
            </p>
            <p>
              <StarIcon isActive={true} />
              Entry Fee <span className='price'>&gt;1.5 TAO + $500</span> Developer fee
            </p>
            <p>
              <StarIcon isActive={true} />
              Profit Share <span className='price'>80%</span> to Trader
            </p>
            <p>
              <span>*variable based on competition and TAO/USD</span>
            </p>
          </div>

          <MinerDashboard />
        </div>
        <img
          src={isNight ? AlphaCornerDarkBackground : AlphaCornerDayBackground}
          alt='background'
          style={{ position: 'absolute', right: '0' }}
        />

        <div className='alpha-corner'>
          <h2 className='features-title'>Alpha Corner</h2>
          <div className='alpha-corner-content'>
            <div className='alpha-corner-benefits'>
              <div className='alpha-corner-title'>
                <p>
                  Powerful forecasting resources help both Developers and Hand Traders gain an edge
                  in the competition.
                </p>
              </div>
              <div className='alpha-corner-ai'>
                <p>AI Strategy Developement</p>
                <span>Coming soon*</span>
              </div>
              <div className='alpha-corner-benefitslist'>
                <p>
                  <StarIcon isActive={true} />
                  Integrated AI Strategy Tools
                </p>
                <p>
                  <StarIcon isActive={true} />
                  Open sourced Time Series Forecasting models for all tradable pairs
                </p>
                <p>
                  <StarIcon isActive={true} />
                  Powerful Data feeds for model training
                </p>
                <p>
                  <StarIcon isActive={true} />
                  Plug and Play competition strategy algorithms
                </p>
                <p>
                  <StarIcon isActive={true} />
                  Compute hosting included
                </p>
              </div>
            </div>
            <div className='alpha-corner-signal'>
              <div className='alpha-corner-signalcontent'>
                <p>
                  <Telegram fill={fill} />
                  Signal V1
                </p>
                <span>Telegram Signal Version 1 included for free with trader registration</span>
              </div>
            </div>
          </div>
        </div>
        <div className='delta-signals'>
          <h2 className='features-title'>Delta De-Fi Trading signals</h2>
          <SignalsCardsList fill={fill} />
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
            <button onClick={handleRegisterClick}>JOIN US NOW</button>
          </div>
        </div>
      </div>
      <Footer />
      <img
        src={isNight ? DarkBottom : LightBottom}
        style={{ position: 'absolute', right: '0', bottom: '0' }}
        alt='bottom'
      />
    </div>
  );
}

export default Home;
