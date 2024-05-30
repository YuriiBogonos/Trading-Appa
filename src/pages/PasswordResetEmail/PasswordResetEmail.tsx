import { useState } from 'react';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';

import { AuthService } from '../../services/AuthService.ts';
import './PasswordResetEmail.scss';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const authService = AuthService.getInstance();

  const onResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await authService.sendPasswordResetEmail(email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      if (error instanceof Error) {
        setMessage('Error sending password reset email: ' + error.message);
      } else {
        setMessage('Error sending password reset email due to an unknown error.');
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
      </div>
    </AuthLayout>
  );
};

export default PasswordResetRequest;
