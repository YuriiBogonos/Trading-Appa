import Home from '@/pages/Home/Home.tsx';
import { IRoute } from '@/types/types.ts';

const routes: IRoute[] = [
  {
    key: 'home',
    title: 'Home',
    path: '/',
    component: Home,
  },
];

export default routes;
