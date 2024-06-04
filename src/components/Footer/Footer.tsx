import LinkedInIcon from '@/components/icons/LinkedIn';
import TwitterIcon from '@/components/icons/Twitter';

import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='social-icons'>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <TwitterIcon />
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <LinkedInIcon />
          </a>
        </div>
        <p>@Delta De-Fi's TaoshiTrader {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
