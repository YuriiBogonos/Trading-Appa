import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { AuthService } from '../../services/AuthService.ts';

const Signup = () => {
  const authService = AuthService.getInstance();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      await authService.signUp(email, password, nickname);
      console.log('User created and saved successfully');
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor='nickname'>Nickname:</label>
          <input
            type='text'
            id='nickname'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder='Enter your nickname'
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter your email'
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Enter your password'
          />
        </div>
        <button type='submit'>Sign Up</button>
        <p>
          Already have an account? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
