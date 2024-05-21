import Home from '@/pages/Home/Home.tsx';
import { IRoute } from '@/types/types.ts';

const routes: IRoute[] = [
  {
    key: 'login',
    title: 'Login',
    path: '/login',
    component: Home,
  },
  {
    key: 'home',
    title: 'Home',
    path: '/',
    component: Home,
  },
];

export default routes;
