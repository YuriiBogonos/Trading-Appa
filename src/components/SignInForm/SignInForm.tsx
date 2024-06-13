import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import HidePasswordIcon from '../../images/HidePassword.svg';
import CheckIcon from '../../images/PasswordSuccessChanged/Check.svg';
import ShowPasswordIcon from '../../images/ShowPassword.svg';
import { AuthService } from '../../services/AuthService.ts';

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { passwordResetSuccess } = location.state || { passwordResetSuccess: false };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Add this state
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const authService = AuthService.getInstance();
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className='login'>
      <div className='signin-title'>
        <p>Log in</p>
        <div className='account'>
          <span>Still not a member?</span>
          <NavLink to='/signup'>Register</NavLink>
        </div>
      </div>
      {passwordResetSuccess && (
        <div className='success-message'>
          <img src={CheckIcon} alt='check' />
          <p>Password successfully recovered!</p>
        </div>
      )}
      <form onSubmit={onLogin}>
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
        <label htmlFor='password'>Password</label>
        <div className='input-wrapper'>
          <input
            id='password'
            name='password'
            type={passwordVisible ? 'text' : 'password'}
            required
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={passwordVisible ? HidePasswordIcon : ShowPasswordIcon}
            alt='toggle password visibility'
            className='eye-icon'
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className='forgot-password'>
          <NavLink to='/reset/email-validation'>Forgot Password?</NavLink>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default SignInForm;
