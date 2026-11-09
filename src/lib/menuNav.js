// Cross-component bridge: anywhere on the page can ask the menu to open a
// tab, scroll to a section or highlight a specific dish.
const EVENT = 'menu:goto';

/** @param {{ group: string, section?: string, code?: string }} target */
export function goToMenu(target) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: target }));
}

export function onGoToMenu(cb) {
  const fn = (e) => cb(e.detail);
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}

export const dishDomId = (sectionId, code) => `plato-${sectionId}-${code}`.toLowerCase();
