import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';
import PasswordStrengthMeter from '@/pages/ConfirmPasswordReset/components/PasswordStrenghtMeter/PasswordStrenghtMeter.tsx';

import { AuthService } from '../../services/AuthService';
import PasswordComplexityService from '../../services/PasswordComplexityService';
import './ConfirmPasswordReset.scss';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: '',
    uppercase: '',
    lowercase: '',
    number: '',
    specialChar: '',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const validatePassword = (password: string) => {
    const errors = PasswordComplexityService.validatePassword(password);
    setPasswordErrors(errors);
    return Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (validatePassword(newPassword)) return;

    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');

    if (!oobCode) {
      setError('Invalid or expired reset link.');
      return;
    }

    try {
      await AuthService.getInstance().confirmPasswordReset(oobCode, newPassword);
      setMessage('Password has been reset successfully.');
      navigate('/login');
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
      <div className='reset-password'>
        <h2>Enter New Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='new-password'>New Password</label>
          <input
            id='new-password'
            name='new-password'
            type='password'
            required
            placeholder='New Password'
            onChange={handlePasswordChange}
          />
          <PasswordStrengthMeter password={newPassword} />
          {Object.values(passwordErrors).map(
            (error, index) =>
              error && (
                <p key={index} style={{ color: 'red' }}>
                  {error}
                </p>
              )
          )}
          <button type='submit'>Reset Password</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
