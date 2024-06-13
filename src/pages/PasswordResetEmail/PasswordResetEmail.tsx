import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';

import { AuthService } from '../../services/AuthService.ts';
import './PasswordResetEmail.scss';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authService = AuthService.getInstance();

  const onResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await authService.sendPasswordResetEmail(email);
      setMessage('Verification code sent! Please check your inbox.');
      navigate('/reset/code', { state: { email } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('Error sending verification code: ' + error.message);
      } else {
        setError('Error sending verification code due to an unknown error.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className='password-reset-request'>
        <div className='reset-title'>
          <p>Reset Password</p>
        </div>
        <form onSubmit={onResetPassword}>
          <label htmlFor='email-address'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            required
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </AuthLayout>
  );
};

export default PasswordResetRequest;
