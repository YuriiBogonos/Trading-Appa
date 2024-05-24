import { useState } from 'react';

import { AuthService } from '../../services/AuthService.ts';
import './SignUp.scss';

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const signup = async () => {
    try {
      const authService = AuthService.getInstance();
      await authService.signUp(email, password, nickname);
      alert('Email verification sent');
      await authService.logout();
      localStorage.setItem('userEmail', email); // Store email in localStorage
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
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor='nickname'>Nickname</label>
      <input
        type='text'
        id='nickname'
        placeholder='Nickname'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={signup}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;
