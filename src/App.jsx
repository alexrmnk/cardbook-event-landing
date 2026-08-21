import { Routes, Route } from 'react-router-dom';
import NewHome from './pages/NewHome';
import ArchiveHome from './archive/v1-networking-club/Home';
import SponsorsPage from './archive/v1-networking-club/SponsorsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NewHome />} />
      <Route path="/archive/v1" element={<ArchiveHome />} />
      <Route path="/archive/v1/sponsors" element={<SponsorsPage />} />
    </Routes>
  );
}
