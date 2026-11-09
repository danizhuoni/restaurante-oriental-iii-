import { useEffect, useRef, useState } from 'react';
import { onScroll, prefersReducedMotion } from './motion.js';

/**
 * Adds `is-visible` to every `[data-reveal]` element inside the returned ref
 * once it enters the viewport. Pure CSS handles the transition.
 */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll('[data-reveal]');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

/**
 * Writes the element's scroll progress to CSS custom properties, without
 * React re-renders:
 *   --enter: 0 → 1 while the element travels from the bottom of the viewport to the top
 *   --through: 0 → 1 across the element's own scrollable height (for sticky scenes)
 *   --exit: 0 → 1 as the element scrolls up and out past the top of the viewport
 */
export function useScrollVars() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return onScroll(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const span = r.height - vh;
      const through = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : enter;
      const exit = Math.min(1, Math.max(0, -r.top / r.height));
      el.style.setProperty('--enter', enter.toFixed(4));
      el.style.setProperty('--through', through.toFixed(4));
      el.style.setProperty('--exit', exit.toFixed(4));
    });
  }, []);
  return ref;
}

/** True while the element is (roughly) on screen — used to pause canvases. */
export function useInView(ref, rootMargin = '100px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

export function useMediaQuery(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setMatch(mq.matches);
    mq.addEventListener('change', fn);
    fn();
    return () => mq.removeEventListener('change', fn);
  }, [query]);
  return match;
}
