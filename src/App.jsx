import { Routes, Route, Navigate } from 'react-router-dom';
import NewHome from './pages/NewHome';
import EventHome from './archive/v1-networking-club/Home';
import SponsorsPage from './archive/v1-networking-club/SponsorsPage';
import { CURRENT_EVENT } from './config/currentEvent';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NewHome />} />
      <Route path={CURRENT_EVENT.path} element={<EventHome />} />
      <Route path={CURRENT_EVENT.sponsorsPath} element={<SponsorsPage />} />
      <Route path="/archive/v1" element={<Navigate to={CURRENT_EVENT.path} replace />} />
      <Route
        path="/archive/v1/sponsors"
        element={<Navigate to={CURRENT_EVENT.sponsorsPath} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
