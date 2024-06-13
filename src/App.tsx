import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import routes from './routes/routes.ts';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        {routes.map(({ key, path, component: Component }) => (
          <Route key={key} path={path} element={<Component />} />
        ))}
      </Routes>
    </ThemeProvider>
  );
}
