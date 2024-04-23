import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './Footer.scss';

const Footer = () => {
  return (
    <>
      <hr />
      <div className='footer'>
        <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
          <InstagramIcon />
        </a>
        <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
          <FacebookIcon />
        </a>
        <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
          <LinkedInIcon />
        </a>
      </div>
    </>
  );
};

export default Footer;
