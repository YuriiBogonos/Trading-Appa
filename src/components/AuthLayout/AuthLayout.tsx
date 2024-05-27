import Footer from '@/components/Footer/Footer.tsx';
import Header from '@/components/Header/Header.tsx';

import FirstBubble from '../../images/BackgroundFigures/First.svg';
import FourBubble from '../../images/BackgroundFigures/Four.svg';
import SecondBubble from '../../images/BackgroundFigures/Second.svg';
import ThirdBubble from '../../images/BackgroundFigures/Third.svg';
import './AuthLayout.scss';

const SharedLayout = ({ children }: any) => {
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
          style={{ position: 'absolute', top: '55%', right: '-30%', filter: 'blur(2px)' }}
          src={FourBubble}
          alt='icon'
        />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default SharedLayout;
