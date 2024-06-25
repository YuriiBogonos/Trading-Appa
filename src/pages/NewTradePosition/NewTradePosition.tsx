import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';

import './NewTradePosition.scss';

function NewTradePosition() {
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
      <div className='newtrade-position'>
        <h1>Register a trader position</h1>
        <div className='newtrade-email'>
          <p>We'll send an email to youremail@gmail.com with the payment link</p>
          <p>Within 6 hours after payment, you will receive a Miner Hot Key</p>
        </div>
        <div className='newtrade-button'>
          <button>Submit</button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default NewTradePosition;
