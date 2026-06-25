import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Roadmap from './components/Roadmap';
import TickerMarquee from './components/TickerMarquee';
import About from './components/About';
import Venue from './components/Venue';
import Agenda from './components/Agenda';
import PastEvents from './components/PastEvents';
import Sponsorship from './components/Sponsorship';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import SponsorsPage from './pages/SponsorsPage';

function MainPage() {
  return (
    <div className="noise-overlay bg-ink-950 text-ink-100 min-h-screen overflow-x-hidden">
      <Hero />
      <About />
      <ValueProps />
      <Roadmap />
      <TickerMarquee />
      <Venue />
      <Agenda />
      <PastEvents />
      <TickerMarquee />
      <Sponsorship />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sponsors" element={<SponsorsPage />} />
    </Routes>
  );
}
