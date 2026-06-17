import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import TickerMarquee from './components/TickerMarquee';
import About from './components/About';
import Venue from './components/Venue';
import Agenda from './components/Agenda';
import Partners from './components/Partners';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="noise-overlay bg-ink-950 text-ink-100 min-h-screen overflow-x-hidden">
      <Hero />
      <About />
      <ValueProps />
      <TickerMarquee />
      <Venue />
      <Agenda />
      <TickerMarquee />
      <Partners />
      <FinalCTA />
      <Footer />
    </div>
  );
}
