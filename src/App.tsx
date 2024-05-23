import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import routes from './routes/routes.ts';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      {routes.map(({ key, path, component: Component }) => (
        <Route key={key} path={path} element={<Component />} />
      ))}
    </Routes>
  );
}
