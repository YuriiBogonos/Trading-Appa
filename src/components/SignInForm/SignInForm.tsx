import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../firebase.ts';

const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/dashboard');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
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
      <form>
        <label htmlFor='email-address'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          required
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          required
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onLogin}>Submit</button>
      </form>
    </div>
  );
};

export default SignInForm;
