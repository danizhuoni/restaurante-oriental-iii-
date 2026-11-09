import { lazy, Suspense, useEffect, useState } from 'react';
import { SITE } from '../data/site.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { useInView, useScrollVars } from '../lib/hooks.js';
import { AnchorLink, Icon, Ornament, Picture } from './ui.jsx';

const GoldDust = lazy(() => import('./GoldDust.jsx'));

export default function Hero() {
  const ref = useScrollVars();
  const inView = useInView(ref, '0px');
  const [fx, setFx] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Load the WebGL layer after first paint so it never delays the hero image.
    const id = (window.requestIdleCallback || setTimeout)(() => setFx(true), { timeout: 1200 });
    return () => (window.cancelIdleCallback || clearTimeout)(id);
  }, []);

  // Subtle depth: the palace image and the title drift against the pointer.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <section id="inicio" className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__bg">
          <Picture name="salon-imperial" alt="" priority className="hero__img" />
        </div>
        <div className="hero__rays" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {fx && (
          <Suspense fallback={null}>
            <GoldDust active={inView} />
          </Suspense>
        )}
        <div className="hero__shade" aria-hidden="true" />

        <span className="hero__vertical" lang="zh-Hant" aria-hidden="true">
          {SITE.zh}
        </span>

        <div className="hero__content">
          <p className="hero__eyebrow">
            <span>{SITE.cuisines}</span>
            <span className="dot" aria-hidden="true" />
            <span>{SITE.address.locality}</span>
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-small">Restaurante</span>
            <span className="hero__title-big">Oriental III</span>
          </h1>
          <p className="hero__zh" lang="zh-Hant">
            {SITE.zh}
          </p>
          <Ornament className="hero__ornament" />
          <div className="hero__actions">
            <AnchorLink to="carta" className="btn btn--gold btn--lg">
              <Icon.menu /> Ver la carta
            </AnchorLink>
            <a className="btn btn--ghost btn--lg" href={`tel:${SITE.phones[0].tel}`}>
              <Icon.phone /> Llamar
            </a>
          </div>
        </div>

        <AnchorLink to="cocina" className="hero__discover">
          <span>Descubre nuestra cocina</span>
          <span className="hero__discover-line" aria-hidden="true" />
        </AnchorLink>
      </div>
    </section>
  );
}
