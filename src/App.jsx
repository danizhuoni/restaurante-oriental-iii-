import { useEffect } from 'react';
import { initSmoothScroll, scrollToId } from './lib/motion.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Kitchen from './components/Kitchen.jsx';
import Cuisine from './components/Cuisine.jsx';
import Menu from './components/menu/Menu.jsx';
import Visit from './components/Visit.jsx';
import Footer from './components/Footer.jsx';
import MobileDock from './components/MobileDock.jsx';

export default function App() {
  useEffect(() => {
    const stop = initSmoothScroll();
    // Honour a hash in the URL (e.g. shared link to #carta) once layout settles.
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => scrollToId(hash), 350);
    return stop;
  }, []);

  return (
    <>
      <a className="skip-link" href="#carta">
        Saltar a la carta
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <div id="cocina">
          <Kitchen />
          <Cuisine />
        </div>
        <Menu />
        <Visit />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
