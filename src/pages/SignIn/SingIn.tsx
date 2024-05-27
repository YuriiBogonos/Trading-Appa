import SharedLayout from '@/components/AuthLayout/AuthLayout.tsx';
import SignInForm from '@/components/SignInForm/SignInForm.tsx';

import './SignIn.scss';

const SignupPage = () => {
  return (
    <SharedLayout>
      <SignInForm />
    </SharedLayout>
  );
};

export default SignupPage;
