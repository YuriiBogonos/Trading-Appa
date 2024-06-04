import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import DeclaimerModal from '@/components/DeclaimerModal/DeclaimerModal.tsx';

import CheckIcon from '../../images/EmailCheck.svg';
import HidePasswordIcon from '../../images/HidePassword.svg';
import ShowPasswordIcon from '../../images/ShowPassword.svg';
import { AuthService } from '../../services/AuthService.ts';

const SignupForm = () => {
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('This field must be filled in'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('This field must be filled in'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Required'),
    nickname: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const authService = AuthService.getInstance();
        await authService.signUp(values.email, values.password, values.nickname);
        alert('Email verification sent');
        await authService.logout();
        localStorage.setItem('userEmail', values.email);
        setIsDisclaimerVisible(true);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An unknown error occurred');
        }
      }
    },
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    const checkEmailExists = async () => {
      if (formik.values.email && !formik.errors.email) {
        const authService = AuthService.getInstance();
        const exists = await authService.emailExists(formik.values.email);
        setEmailExists(exists);
      }
    };

    checkEmailExists();
  }, [formik.values.email, formik.errors.email]);

  const handleDisclaimerContinue = () => {
    if (isDisclaimerChecked) {
      setIsDisclaimerVisible(false);
    } else {
      alert('Please confirm that you are familiar with the competition rules and FAQ.');
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
      <form onSubmit={formik.handleSubmit}>
        <div className='input-wrapper'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>
          ) : null}
          {formik.values.email && !emailExists && !formik.errors.email && (
            <img src={CheckIcon} alt='check icon' className='check-icon' />
          )}
        </div>
        <label htmlFor='nickname'>PTN nickname</label>
        <input type='text' id='nickname' {...formik.getFieldProps('nickname')} />
        {formik.touched.nickname && formik.errors.nickname ? (
          <div className='error'>{formik.errors.nickname}</div>
        ) : null}
        <div className='input-wrapper'>
          <label htmlFor='password'>Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id='password'
            {...formik.getFieldProps('password')}
          />
          <img
            src={passwordVisible ? HidePasswordIcon : ShowPasswordIcon}
            alt='toggle password visibility'
            className='eye-icon'
            onClick={togglePasswordVisibility}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='error'>{formik.errors.password}</div>
          ) : null}
        </div>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' id='confirmPassword' {...formik.getFieldProps('confirmPassword')} />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className='error'>{formik.errors.confirmPassword}</div>
        ) : null}
        <button type='submit'>Submit</button>
      </form>

      <DeclaimerModal isVisible={isDisclaimerVisible} onClose={() => setIsDisclaimerVisible(false)}>
        <div className='disclaimer-content'>
          <h2>Disclaimer</h2>
          <p>
            User are aware this is a competitive competition and registration fees will be lost
            forever if you are not competitive amongst the other participants. It is recommended
            users start with a TaoshiTrader test account before registering with real money.
          </p>
          <div className='disclaimer-actions'>
            <div className='disclaimer-checkbox'>
              <input
                type='checkbox'
                id='disclaimer-check'
                checked={isDisclaimerChecked}
                onChange={(e) => setIsDisclaimerChecked(e.target.checked)}
              />
              <label htmlFor='disclaimer-check'>
                I confirm that I am familiar with the{' '}
                <NavLink to='/competition-rules'>Competition Rules and FAQ</NavLink>
              </label>
            </div>
            <button onClick={handleDisclaimerContinue}>Continue</button>
          </div>
        </div>
      </DeclaimerModal>
    </div>
  );
};

export default SignupForm;
