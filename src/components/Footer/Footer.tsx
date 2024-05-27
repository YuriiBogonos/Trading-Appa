import LinkedIn from '../../images/FooterIcons/LinkedIn.svg';
import Twitter from '../../images/FooterIcons/Twitter.svg';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='social-icons'>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <img src={Twitter} alt='twitterIcon' />
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <img src={LinkedIn} alt='linkedinIcon' />
          </a>
        </div>
        <p>@TaoshiTrader {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
