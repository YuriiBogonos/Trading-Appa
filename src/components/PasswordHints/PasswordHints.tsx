import React from 'react';

import { PasswordHintsProps } from '@/types/types.ts';

import Failed from '../../images/PasswordStrengthIcons/Failed.svg';
import Success from '../../images/PasswordStrengthIcons/Success.svg';
import './PasswordHints.scss';

const PasswordHints: React.FC<PasswordHintsProps> = ({ passwordErrors }) => {
  return (
    <div className='password-hints'>
      {!passwordErrors.uppercase ? (
        <p className='valid'>
          <img src={Success} alt='success' /> 1 or more uppercase letters (A-Z)
        </p>
      ) : (
        <p className='invalid'>
          <img src={Failed} alt='failed' /> {passwordErrors.uppercase}
        </p>
      )}
      {!passwordErrors.lowercase ? (
        <p className='valid'>
          <img src={Success} alt='success' />1 or more lowercase letters (a-z)
        </p>
      ) : (
        <p className='invalid'>
          <img src={Failed} alt='failed' /> {passwordErrors.lowercase}
        </p>
      )}
      {!passwordErrors.number ? (
        <p className='valid'>
          <img src={Success} alt='success' />1 or more numbers (0-9)
        </p>
      ) : (
        <p className='invalid'>
          <img src={Failed} alt='failed' /> {passwordErrors.number}
        </p>
      )}
      {!passwordErrors.specialChar ? (
        <p className='valid'>
          <img src={Success} alt='success' />1 or more special characters
        </p>
      ) : (
        <p className='invalid'>
          <img src={Failed} alt='failed' /> {passwordErrors.specialChar}
        </p>
      )}
      {!passwordErrors.length ? (
        <p className='valid'>
          <img src={Success} alt='success' /> 8 or more characters
        </p>
      ) : (
        <p className='invalid'>
          <img src={Failed} alt='failed' /> {passwordErrors.length}
        </p>
      )}
    </div>
  );
};

export default PasswordHints;
