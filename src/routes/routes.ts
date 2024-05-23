import Dashboard from '@/pages/Dashboard/Dashboard.tsx';
import Home from '@/pages/Home/Home.tsx';
import Login from '@/pages/Login/Login.tsx';
import SignUp from '@/pages/SignUp/SignUp.tsx';
import { IRoute } from '@/types/types.ts';

const routes: IRoute[] = [
  {
    key: 'login',
    title: 'Login',
    path: '/login',
    component: Login,
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
    path: '/',
    component: Home,
  },
];

export default routes;
