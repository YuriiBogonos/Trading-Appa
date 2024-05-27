import Dashboard from '@/pages/Dashboard/Dashboard.tsx';
import Home from '@/pages/Home/Home.tsx';
import SingIn from '@/pages/SignIn/SingIn.tsx';
import SignUp from '@/pages/SignUp/SignUp.tsx';
import VerifyEmail from '@/pages/VerifyEmail/VerifyEmail.tsx';
import { IRoute } from '@/types/types.ts';

const routes: IRoute[] = [
  {
    key: 'login',
    title: 'Login',
    path: '/login',
    component: SingIn,
  },
  {
    key: 'verify-email',
    title: 'Verify',
    path: '/verify-email',
    component: VerifyEmail,
  },
  {
    key: 'signup',
    title: 'SignUp',
    path: '/signup',
    component: SignUp,
  },
  {
    key: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    key: 'home',
    title: 'Home',
    path: '/home',
    component: Home,
  },
];

export default routes;
