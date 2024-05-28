import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthService } from '../../services/AuthService.ts';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const authService = AuthService.getInstance();
      await authService.signUp(email, password, nickname);
      alert('Email verification sent');
      await authService.logout();
      localStorage.setItem('userEmail', email);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div className='signup'>
      <div className='signup-title'>
        <p>Sign up</p>
        <div className='account'>
          <span>Have an account already?</span>
          <NavLink to='/login'>Log in</NavLink>
        </div>
      </div>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor='nickname'>PTN nickname</label>
      <input
        type='text'
        id='nickname'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor='confirm-password'>Confirm Password</label>{' '}
      <input
        type='password'
        id='confirm-password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={signup}>Submit</button>
    </div>
  );
};

export default SignupForm;
