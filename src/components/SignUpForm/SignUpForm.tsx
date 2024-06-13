import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import DeclaimerModal from '@/components/DeclaimerModal/DeclaimerModal.tsx';
import PasswordHints from '@/components/PasswordHints/PasswordHints';
import PasswordStrengthMeter from '@/pages/ConfirmPasswordReset/components/PasswordStrenghtMeter/PasswordStrenghtMeter.tsx';

import CloseIcon from '../../images/CloseIcon.svg';
import CheckIcon from '../../images/EmailCheck.svg';
import HidePasswordIcon from '../../images/HidePassword.svg';
import ErrorIcon from '../../images/PasswordStrengthIcons/Failed.svg';
import ShowPasswordIcon from '../../images/ShowPassword.svg';
import { AuthService } from '../../services/AuthService.ts';
import PasswordComplexityService from '../../services/PasswordComplexityService.ts';

const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const SignupForm = () => {
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [disclaimerError, setDisclaimerError] = useState(false);
  const [shake, setShake] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(emailRegex, 'Invalid email address')
        .required('This field must be filled in'),
      password: Yup.string()
        .required('Password is required')
        .test('password-strength', 'Password does not meet complexity requirements', (value) => {
          const errors = PasswordComplexityService.validatePassword(value || '');
          return Object.values(errors).every((error) => error === '');
        }),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Required'),
      nickname: Yup.string().required('Required'),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async () => {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0 && !emailExists) {
        setIsDisclaimerVisible(true);
      } else {
        formik.setTouched({
          email: true,
          password: true,
          confirmPassword: true,
          nickname: true,
        });
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateEmail = async (email: string) => {
    if (email && emailRegex.test(email)) {
      const authService = AuthService.getInstance();
      const exists = await authService.emailExists(email);
      setEmailExists(exists);
      setEmailValidated(true);
    } else {
      setEmailValidated(false);
    }
  };

  useEffect(() => {
    validateEmail(formik.values.email);
  }, [formik.values.email]);

  const handleDisclaimerContinue = async () => {
    if (isDisclaimerChecked) {
      try {
        const authService = AuthService.getInstance();
        await authService.signUp(
          formik.values.email,
          formik.values.password,
          formik.values.nickname
        );
        alert('Email verification sent');
        await authService.logout();
        localStorage.setItem('userEmail', formik.values.email);
        setIsDisclaimerVisible(false);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An unknown error occurred');
        }
      }
    } else {
      setDisclaimerError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const passwordErrors = PasswordComplexityService.validatePassword(formik.values.password);

  return (
    <div className='signup'>
      <div className='signup-title'>
        <p>Sign up</p>
        <div className='account'>
          <span>Already a member?</span>
          <NavLink to='/login'>Log in</NavLink>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='input-wrapper'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && (
            <div className='error'>{formik.errors.email}</div>
          )}
          {formik.values.email && emailValidated && !emailExists && (
            <img src={CheckIcon} alt='check icon' className='check-icon' />
          )}
          {formik.values.email && emailValidated && emailExists && (
            <img
              src={ErrorIcon}
              alt='error-icon'
              className='check-icon'
              title='This Email already exists'
            />
          )}
        </div>
        <div className='input'>
          <label htmlFor='nickname'>PTN nickname</label>
          <input type='text' id='nickname' {...formik.getFieldProps('nickname')} />
          {formik.touched.nickname && formik.errors.nickname && (
            <div className='error'>{formik.errors.nickname}</div>
          )}
        </div>
        <div className='input-wrapper'>
          <label htmlFor='password'>Password</label>
          <div className='input-container'>
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
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className='error'>{formik.errors.password}</div>
          )}
          {formik.values.password && (
            <>
              <PasswordStrengthMeter password={formik.values.password} />
              <PasswordHints passwordErrors={passwordErrors} />
            </>
          )}
        </div>
        <div className='input-wrapper'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className='input-container'>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id='confirmPassword'
              {...formik.getFieldProps('confirmPassword')}
            />
            <img
              src={confirmPasswordVisible ? HidePasswordIcon : ShowPasswordIcon}
              alt='toggle password visibility'
              className='eye-icon'
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className='error'>{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button type='submit'>Submit</button>
      </form>

      <DeclaimerModal isVisible={isDisclaimerVisible} onClose={() => setIsDisclaimerVisible(false)}>
        <div className='disclaimer-content'>
          <button className='close-button' onClick={() => setIsDisclaimerVisible(false)}>
            <img src={CloseIcon} alt='Close' />
          </button>
          <h2>Disclaimer</h2>
          <p>
            Users are aware this is a competitive competition and registration fees will be lost
            forever if you are not competitive amongst the other participants. It is recommended
            users start with a TaoshiTrader test account before registering with real money.
          </p>
          <div className='disclaimer-actions'>
            <div className={`disclaimer-checkbox ${shake ? 'shake' : ''}`}>
              <input
                type='checkbox'
                id='disclaimer-check'
                checked={isDisclaimerChecked}
                onChange={(e) => {
                  setIsDisclaimerChecked(e.target.checked);
                  setDisclaimerError(false); // Reset error on change
                }}
              />
              <label htmlFor='disclaimer-check'>
                I confirm that I am familiar with the{' '}
                <NavLink to='/competition-rules'>Competition Rules and FAQ</NavLink>
              </label>
            </div>
            <button onClick={handleDisclaimerContinue}>Continue</button>
          </div>
          {disclaimerError && (
            <div className='error-declaimer'>You must agree to the disclaimer</div>
          )}
        </div>
      </DeclaimerModal>
    </div>
  );
};

export default SignupForm;
