import { Route, Routes } from 'react-router-dom';

import routes from './routes/routes.ts';

export default function App() {
  return (
    <Routes>
      {routes.map(({ key, path, component: Component }) => (
        <Route key={key} path={path} element={<Component />} />
      ))}
    </Routes>
  );
}
