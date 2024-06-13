import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';

import { AuthService } from '../../services/AuthService.ts';
import './CheckEmailPasswordCode.scss';

const RESEND_TIMEOUT = 45;

function CheckEmailPasswordCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || { email: '' };
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [isResendVisible, setIsResendVisible] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setIsResendVisible(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleResendCode = async () => {
    try {
      await AuthService.getInstance().sendPasswordResetEmail(email);
      setMessage('A new verification code has been sent to your email.');
      setTimer(RESEND_TIMEOUT);
      setIsResendVisible(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email || !verificationCode) {
      setError('Invalid or missing information.');
      return;
    }

    try {
      await AuthService.getInstance().verifyResetCode(email, verificationCode);
      setMessage('Code has been verified successfully.');
      navigate('/reset', { state: { email, verificationCode } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className='verify-code'>
        <div className='verify-title'>
          <h2>Reset Password</h2>
          <span>Enter the code we sent to {email}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='verify-code-block'>
            <label htmlFor='verification-code'>Code</label>
            <input
              id='verification-code'
              name='verification-code'
              type='text'
              required
              placeholder='Code'
              onChange={handleVerificationCodeChange}
            />
          </div>
          {timer > 0 && (
            <p className='resend'>
              Send the code again in <span>{timer} seconds</span>
            </p>
          )}
          {isResendVisible && (
            <button className='resend-button' onClick={handleResendCode}>
              Resend Code
            </button>
          )}
          <button type='submit'>Submit</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </AuthLayout>
  );
}

export default CheckEmailPasswordCode;
