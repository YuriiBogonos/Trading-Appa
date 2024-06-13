import { useContext } from 'react';

import Footer from '@/components/Footer/Footer.tsx';
import Header from '@/components/Header/Header.tsx';

import DarkBottom from '../../images/BackgroundFigures/DarkBottom.png';
import FirstBubble from '../../images/BackgroundFigures/First.svg';
import FourBubble from '../../images/BackgroundFigures/Four.svg';
import LightBottom from '../../images/BackgroundFigures/LightBottom.png';
import SecondBubble from '../../images/BackgroundFigures/Second.svg';
import ThirdBubble from '../../images/BackgroundFigures/Third.svg';
import { ThemeContext } from '../../providers/ThemeProvider.tsx';
import './AuthLayout.scss';

const SharedLayout = ({ children }: any) => {
  const { isNight } = useContext(ThemeContext);
  return (
    <div className='shared-layout-wrapper'>
      <Header />
      <img style={{ position: 'absolute' }} src={ThirdBubble} alt='icon' />
      <img
        style={{ position: 'absolute', top: '0', right: '3%', zIndex: 0 }}
        src={SecondBubble}
        alt='icon'
      />
      <div className='form-container'>
        <img
          style={{ position: 'absolute', top: '40%', left: '-30%', filter: 'blur(2px)' }}
          src={FirstBubble}
          alt='icon'
        />
        <img
          style={{ position: 'absolute', top: '55%', left: '90%', filter: 'blur(2px)' }}
          src={FourBubble}
          alt='icon'
        />
        {children}
      </div>
      <Footer />
      <img
        src={isNight ? DarkBottom : LightBottom}
        style={{ position: 'absolute', right: '0', bottom: '0' }}
        alt='bottom'
      />
    </div>
  );
};

export default SharedLayout;
