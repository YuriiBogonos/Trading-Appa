import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';
import PasswordHints from '@/components/PasswordHints/PasswordHints';
import PasswordStrengthMeter from '@/pages/ConfirmPasswordReset/components/PasswordStrenghtMeter/PasswordStrenghtMeter.tsx';

import HidePasswordIcon from '../../images/HidePassword.svg';
import ShowPasswordIcon from '../../images/ShowPassword.svg';
import { AuthService } from '../../services/AuthService';
import PasswordComplexityService from '../../services/PasswordComplexityService';
import './ConfirmPasswordReset.scss';

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, verificationCode } = location.state || { email: '', verificationCode: '' };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!email || !verificationCode) {
        setErrors({ newPassword: 'Invalid or expired reset link.' });
        setSubmitting(false);
        return;
      }

      try {
        await AuthService.getInstance().verifyResetCodeAndResetPassword(
          email,
          verificationCode,
          values.newPassword
        );
        navigate('/login', { state: { passwordResetSuccess: true } });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrors({ newPassword: error.message });
        } else {
          setErrors({ newPassword: 'An unknown error occurred.' });
        }
        setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const passwordErrors = PasswordComplexityService.validatePassword(formik.values.newPassword);

  return (
    <AuthLayout>
      <div className='reset-password'>
        <div className='reset-title'>
          <h2>Reset Password</h2>
          <span>
            Enter and confirm your new password, using at least 1 uppercase, 1 lovercase, and number
            (0-9) required
          </span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor='newPassword'>New Password</label>
          <div className='input-wrapper'>
            <input
              id='newPassword'
              name='newPassword'
              type={passwordVisible ? 'text' : 'password'}
              className='new-password'
              required
              placeholder='New Password'
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <img
              src={passwordVisible ? HidePasswordIcon : ShowPasswordIcon}
              alt='toggle password visibility'
              className='eye-icon'
              onClick={togglePasswordVisibility}
            />
          </div>
          {formik.values.newPassword && (
            <>
              <PasswordStrengthMeter password={formik.values.newPassword} />
              <PasswordHints passwordErrors={passwordErrors} />
            </>
          )}
          <label htmlFor='confirmPassword'>Confirm New Password</label>
          <div className='input-wrapper'>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type={confirmPasswordVisible ? 'text' : 'password'}
              required
              placeholder='Confirm New Password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <img
              src={confirmPasswordVisible ? HidePasswordIcon : ShowPasswordIcon}
              alt='toggle password visibility'
              className='eye-icon'
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          <span className='error-confirm'>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p style={{ color: 'red' }}>{formik.errors.confirmPassword}</p>
            ) : null}
          </span>
          <button type='submit' disabled={formik.isSubmitting}>
            Reset Password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
