import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';

const ActionHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');
  const actionCode = queryParams.get('oobCode');
  const auth = getAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAction = async () => {
      switch (mode) {
        case 'resetPassword':
          navigate(`/reset?oobCode=${actionCode}`);
          break;
        case 'verifyEmail':
          navigate(`/verify-email?oobCode=${actionCode}`);
          break;
        default:
          setMessage('Invalid action mode');
      }
    };

    handleAction();
  }, [mode, actionCode, auth, navigate]);

  return <div>{message && <h1>{message}</h1>}</div>;
};

export default ActionHandler;
