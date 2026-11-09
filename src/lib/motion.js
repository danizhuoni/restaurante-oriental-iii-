import Lenis from 'lenis';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
const listeners = new Set();

/** Starts Lenis smooth scrolling (skipped when the user prefers reduced motion). */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, anchors: false });
  let raf;
  const loop = (t) => {
    lenis.raf(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis.destroy();
    lenis = null;
  };
}

/** Pause / resume smooth scroll (used while the mobile menu overlay is open). */
export function setScrollLocked(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.classList.toggle('is-locked', locked);
}

const navOffset = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;

/** Scrolls to an element id, compensating for the fixed header. */
export function scrollToId(id, { extraOffset = 0 } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = id === 'inicio' ? 0 : navOffset() + extraOffset;
  if (lenis) {
    lenis.start(); // in case a just-closed overlay had paused it
    lenis.resize(); // the page height may have just changed (e.g. a menu tab switch)
    lenis.scrollTo(el, { offset: -offset, duration: 1.4, force: true });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
  // Move focus for keyboard and screen-reader users without a second jump.
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  history.replaceState(null, '', `#${id}`);
}

/**
 * One shared rAF-throttled scroll listener. Callbacks receive scrollY.
 * Returns an unsubscribe function.
 */
export function onScroll(cb) {
  listeners.add(cb);
  if (listeners.size === 1) {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        listeners.forEach((fn) => fn(window.scrollY));
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    onScroll.handler = handler;
  }
  cb(window.scrollY);
  return () => {
    listeners.delete(cb);
    if (!listeners.size && onScroll.handler) {
      window.removeEventListener('scroll', onScroll.handler);
      window.removeEventListener('resize', onScroll.handler);
      onScroll.handler = null;
    }
  };
}
