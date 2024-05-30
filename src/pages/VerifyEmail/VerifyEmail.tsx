import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { applyActionCode, getAuth } from 'firebase/auth';

import { AuthService } from '../../services/AuthService.ts';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const query = new URLSearchParams(location.search);
  const actionCode = query.get('oobCode');
  const auth = getAuth();
  const [message, setMessage] = useState('Verifying email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (actionCode) {
          await applyActionCode(auth, actionCode);
          const email = localStorage.getItem('userEmail');
          if (email) {
            const authService = AuthService.getInstance();
            const userData = await authService.getUserByEmail(email);
            if (userData) {
              const userId = Object.keys(userData)[0];

              await authService.verifyUser(userId);
              localStorage.removeItem('userEmail');
              setMessage('Email verified successfully. You can now log in.');
              navigate('/login'); // Redirect to the login page immediately
            } else {
              setMessage('No user found with this email');
            }
          } else {
            setMessage('User email not found in localStorage');
          }
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setMessage('Error verifying email');
      }
    };

    verifyEmail();
  }, [actionCode, auth, navigate]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
