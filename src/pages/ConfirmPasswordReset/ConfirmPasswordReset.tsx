import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';

import { AuthService } from '../../services/AuthService.ts';
import './ConfirmPasswordReset.scss';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');

    if (oobCode) {
      try {
        await AuthService.getInstance().confirmPasswordReset(oobCode, newPassword);
        setMessage('Password has been reset successfully.');
        navigate('/login');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    } else {
      setError('Invalid or expired reset link.');
    }
  };

  return (
    <AuthLayout>
      <div className='reset-password'>
        <h2>Enter New Password</h2>
        <form>
          <label htmlFor='new-password'>New Password</label>
          <input
            id='new-password'
            name='new-password'
            type='password'
            required
            placeholder='New Password'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={onResetPassword}>Reset Password</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
