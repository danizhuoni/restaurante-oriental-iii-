import { useEffect, useRef, useState } from 'react';
import { NAV, SITE } from '../data/site.js';
import { onScroll, setScrollLocked } from '../lib/motion.js';
import { AnchorLink, Icon } from './ui.jsx';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(
    () =>
      onScroll((y) => {
        setScrolled(y > 40);
        // The active link is the last section whose top passed 40% of the viewport.
        const mark = window.innerHeight * 0.4;
        let current = NAV[0].id;
        for (const { id } of NAV) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= mark) current = id;
        }
        setActive(current);
      }),
    [],
  );

  // Mobile overlay: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector('a, button')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panel) {
        const items = [...panel.querySelectorAll('a, button')];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    // Unlock synchronously so the scroll that follows a link tap isn't swallowed.
    setScrollLocked(false);
    setOpen(false);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner">
        <AnchorLink to="inicio" className="brand" aria-label={`${SITE.name}, ir al inicio`} onNavigate={close}>
          <span className="brand__seal" lang="zh-Hant" aria-hidden="true">
            東方
          </span>
          <span className="brand__text">
            <span className="brand__small">Restaurante</span>
            <span className="brand__name">Oriental III</span>
          </span>
        </AnchorLink>

        <nav className="nav__links" aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <AnchorLink to={item.id} className={active === item.id ? 'is-active' : ''} aria-current={active === item.id ? 'true' : undefined}>
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <a className="nav__phone" href={`tel:${SITE.phones[0].tel}`}>
            <Icon.phone />
            <span>{SITE.phones[0].display}</span>
          </a>
          <AnchorLink to="carta" className="btn btn--gold btn--sm nav__cta">
            Ver carta
          </AnchorLink>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mobile-menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Menú de navegación">
        <span className="mobile-menu__zh" lang="zh-Hant" aria-hidden="true">
          東方大酒店
        </span>
        <nav aria-label="Móvil">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <AnchorLink to={item.id} onNavigate={close} className={active === item.id ? 'is-active' : ''}>
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <AnchorLink to="carta" className="btn btn--gold" onNavigate={close}>
            <Icon.menu /> Ver la carta
          </AnchorLink>
          {SITE.phones.map((p) => (
            <a key={p.tel} className="btn btn--ghost" href={`tel:${p.tel}`}>
              <Icon.phone /> {p.display}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
