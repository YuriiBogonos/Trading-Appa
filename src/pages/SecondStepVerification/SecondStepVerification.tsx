import { useLocation } from 'react-router-dom';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';

import './SecondStepVerification.scss';

function SecondStepVerification() {
  const location = useLocation();
  const email = location.state?.email || '';
  const customStyles = {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '70rem',
    margin: '0 auto',
    height: '100%',
    minHeight: '100dvh',
    zIndex: 1,
  };
  return (
    <AuthLayout customStyles={customStyles}>
      <div className='step'>
        <h1>Second Step Verification</h1>
        <div className='step-email'>
          <p>Check your email</p>
          <p>{email}</p>
        </div>
        <div className='step-message'>
          <span>
            Confirm your email address to start using Delta De-Fi Trade Signals . If you do not
            receive it right away, please check your spam folder.
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SecondStepVerification;
