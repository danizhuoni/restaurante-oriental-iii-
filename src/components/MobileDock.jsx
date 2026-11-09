import { useEffect, useState } from 'react';
import { SITE } from '../data/site.js';
import { onScroll } from '../lib/motion.js';
import { AnchorLink, Icon } from './ui.jsx';

/** Bottom action bar on phones: the menu and a call are always one tap away. */
export default function MobileDock() {
  const [show, setShow] = useState(false);
  useEffect(() => onScroll((y) => setShow(y > window.innerHeight * 0.6)), []);

  return (
    <div className={`dock ${show ? 'dock--show' : ''}`}>
      <AnchorLink to="carta" className="dock__item dock__item--main">
        <Icon.menu />
        <span>Carta</span>
      </AnchorLink>
      <a className="dock__item" href={`tel:${SITE.phones[0].tel}`}>
        <Icon.phone />
        <span>Llamar</span>
      </a>
      <a className="dock__item" href={SITE.directions} target="_blank" rel="noopener noreferrer">
        <Icon.pin />
        <span>Cómo llegar</span>
      </a>
    </div>
  );
}
