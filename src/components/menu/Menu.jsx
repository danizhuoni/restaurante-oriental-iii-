import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { ALL_DISHES, ALLERGEN_NOTE, ALLERGENS, MENU } from '../../data/menu.js';
import { dishDomId, onGoToMenu } from '../../lib/menuNav.js';
import { onScroll, scrollToId } from '../../lib/motion.js';
import { useReveal } from '../../lib/hooks.js';
import { Icon, Price, SectionTitle } from '../ui.jsx';
import { Dish, SectionBlock } from './MenuBlocks.jsx';

const norm = (s = '') =>
  s
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// Drinks are searchable too (they live in tables, not dish lists).
const DRINKS = MENU.find((g) => g.id === 'bebidas').sections.flatMap((s) =>
  s.groups.flatMap((g) =>
    g.items.map((it) => ({
      name: it.name,
      group: g.title,
      prices: it.prices.map((p, i) => (p ? `${g.columns[i]}: ${p} €` : null)).filter(Boolean),
    })),
  ),
);

const sectionCount = (group) =>
  group.sections.reduce((n, s) => n + (s.items?.length || s.menus?.length || (s.courses ? 1 : 0) || s.groups?.reduce((m, g) => m + g.items.length, 0) || 0), 0);

export default function Menu() {
  const [groupId, setGroupId] = useState(MENU[0].id);
  const [query, setQuery] = useState('');
  const [activeSec, setActiveSec] = useState(MENU[0].sections[0].id);
  const deferredQuery = useDeferredValue(query);
  const barRef = useRef(null);
  const chipsRef = useRef(null);
  const tabRefs = useRef({});
  const [pending, setPending] = useState(null);
  const revealRef = useReveal();

  const group = MENU.find((g) => g.id === groupId);
  const q = norm(deferredQuery.trim());

  const results = useMemo(() => {
    if (!q) return null;
    const words = q.split(/\s+/);
    const hit = (text) => words.every((w) => text.includes(w));
    return {
      dishes: ALL_DISHES.filter((d) => hit(norm(`${d.code} ${d.name} ${d.en || ''} ${d.desc || ''} ${d.sectionTitle}`))),
      drinks: DRINKS.filter((d) => hit(norm(`${d.name} ${d.group}`))),
    };
  }, [q]);

  const barHeight = () => barRef.current?.offsetHeight || 0;
  // When switching tabs from deep inside a long list, jump back to the top of the new tab.
  const panelIsAboveBar = () => {
    const panel = document.getElementById('carta-panel');
    const bar = barRef.current;
    return !!panel && !!bar && panel.getBoundingClientRect().top < bar.getBoundingClientRect().bottom;
  };

  const scrollToSection = useCallback((id) => {
    scrollToId(`sec-${id}`, { extraOffset: barHeight() + 8 });
  }, []);

  // Open a tab; optionally land on a section or dish after it renders.
  const openGroup = useCallback(
    (id, { section, code, scroll = true } = {}) => {
      setQuery('');
      setGroupId(id);
      // A fresh object every time, so repeated requests for the open tab still run.
      setPending(scroll ? { group: id, section, code } : null);
    },
    [],
  );

  // Perform the pending scroll/highlight once the right tab is in the DOM.
  useEffect(() => {
    const p = pending;
    if (!p || p.group !== groupId || results) return;
    setPending(null);
    requestAnimationFrame(() => {
      const offset = barHeight() + 16;
      if (p.code && p.section) {
        const domId = dishDomId(p.section, p.code);
        scrollToId(domId, { extraOffset: offset });
        const el = document.getElementById(domId);
        if (el) {
          el.classList.remove('is-highlight');
          void el.offsetWidth;
          el.classList.add('is-highlight');
        }
      } else if (p.section) {
        scrollToId(`sec-${p.section}`, { extraOffset: offset });
      } else {
        scrollToId('carta-panel', { extraOffset: offset });
      }
    });
  }, [pending, groupId, results]);

  useEffect(() => onGoToMenu((t) => openGroup(t.group, { section: t.section, code: t.code })), [openGroup]);

  // Scroll-spy for the section chips of the current tab.
  useEffect(() => {
    if (results) return;
    const ids = group.sections.map((s) => s.id);
    setActiveSec(ids[0]);
    return onScroll(() => {
      const line = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72) + barHeight() + 40;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(`sec-${id}`);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSec(current);
    });
  }, [group, results]);

  // Keep the active chip visible inside its horizontal scroller.
  useEffect(() => {
    const wrap = chipsRef.current;
    const chip = wrap?.querySelector(`[data-sec="${activeSec}"]`);
    if (!wrap || !chip) return;
    const left = chip.offsetLeft - wrap.clientWidth / 2 + chip.clientWidth / 2;
    wrap.scrollTo({ left, behavior: 'smooth' });
  }, [activeSec]);

  const onTabKey = (e, index) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -Infinity, End: Infinity };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = keys[e.key] === -Infinity ? 0 : keys[e.key] === Infinity ? MENU.length - 1 : (index + keys[e.key] + MENU.length) % MENU.length;
    const id = MENU[next].id;
    openGroup(id, { scroll: false });
    tabRefs.current[id]?.focus();
  };

  const totalDishes = ALL_DISHES.length;

  return (
    <section id="carta" className="menu" ref={revealRef} aria-labelledby="carta-title">
      <div className="menu__paper" aria-hidden="true" />
      <div className="container container--menu">
        <SectionTitle eyebrow="IV · Carta" zh="菜單" title="La Carta" id="carta-title">
          <p>
            Cocina china, dim sum, cocina japonesa, menús y bebidas. {totalDishes} platos con su número de carta, precio y alérgenos.
          </p>
        </SectionTitle>

        <div className="menu__tools">
          <label className="search">
            <Icon.search />
            <span className="sr-only">Buscar en la carta</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar plato, número o ingrediente…"
              autoComplete="off"
              enterKeyHint="search"
            />
            {query && (
              <button type="button" className="search__clear" onClick={() => setQuery('')} aria-label="Borrar búsqueda">
                <Icon.close />
              </button>
            )}
          </label>
          <details className="legend">
            <summary>
              Alérgenos <span aria-hidden="true">(1–14)</span>
            </summary>
            <div className="legend__panel">
              <p className="legend__note">{ALLERGEN_NOTE}</p>
              <ul className="legend__list">
                {Object.entries(ALLERGENS).map(([n, label]) => (
                  <li key={n}>
                    <span className={`allergen allergen--${n}`} aria-hidden="true">
                      {n}
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>

        <div className="menu__bar" ref={barRef}>
          <div className="tabs" role="tablist" aria-label="Secciones de la carta">
            {MENU.map((g, i) => (
              <button
                key={g.id}
                ref={(el) => (tabRefs.current[g.id] = el)}
                type="button"
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={!results && g.id === groupId}
                aria-controls="carta-panel"
                tabIndex={g.id === groupId ? 0 : -1}
                className="tab"
                onClick={() => openGroup(g.id, { scroll: panelIsAboveBar() })}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                <span className="tab__zh" lang="zh-Hant" aria-hidden="true">
                  {g.zh}
                </span>
                <span className="tab__label">{g.title}</span>
              </button>
            ))}
          </div>
          {!results && group.sections.length > 1 && (
            <nav className="chips" ref={chipsRef} aria-label={`Apartados de ${group.title}`}>
              {group.sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  data-sec={s.id}
                  className={`chip ${activeSec === s.id ? 'is-active' : ''}`}
                  aria-current={activeSec === s.id ? 'true' : undefined}
                  onClick={() => scrollToSection(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          )}
        </div>

        {results ? (
          <div id="carta-panel" className="menu__panel" aria-live="polite">
            <p className="results__count">
              {results.dishes.length + results.drinks.length === 0
                ? `No hay resultados para «${deferredQuery.trim()}».`
                : `${results.dishes.length + results.drinks.length} resultado${results.dishes.length + results.drinks.length === 1 ? '' : 's'} para «${deferredQuery.trim()}»`}
            </p>
            {results.dishes.length > 0 && (
              <ul className="dish-list">
                {results.dishes.map((d) => (
                  <Dish key={`${d.sectionId}-${d.code}`} item={d} sectionId={`buscar-${d.sectionId}`} showSection={d.sectionTitle} />
                ))}
              </ul>
            )}
            {results.drinks.length > 0 && (
              <ul className="dish-list dish-list--drinks">
                {results.drinks.map((d) => (
                  <li className="dish" key={`${d.group}-${d.name}`}>
                    <div className="dish__body">
                      <span className="dish__code" aria-hidden="true">
                        ·
                      </span>
                      <div className="dish__text">
                        <p className="dish__section">{d.group}</p>
                        <p className="dish__name">{d.name}</p>
                      </div>
                      <span className="dish__leader" aria-hidden="true" />
                      <span className="price price--multi">{d.prices.join(' · ')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div id="carta-panel" className="menu__panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} key={group.id}>
            <header className="panel-head">
              <span className="panel-head__zh" lang="zh-Hant" aria-hidden="true">
                {group.zh}
              </span>
              <h3 className="panel-head__title">{group.title}</h3>
              <p className="panel-head__meta">
                {group.sections.length} {group.sections.length === 1 ? 'apartado' : 'apartados'} · {sectionCount(group)} referencias
              </p>
            </header>
            {group.sections.map((s) => (
              <SectionBlock key={s.id} section={s} />
            ))}
            <nav className="panel-next" aria-label="Otras secciones de la carta">
              {MENU.filter((g) => g.id !== group.id).map((g) => (
                <button key={g.id} type="button" className="panel-next__btn" onClick={() => openGroup(g.id)}>
                  <span lang="zh-Hant" aria-hidden="true">
                    {g.zh}
                  </span>
                  {g.title}
                  <Icon.arrow />
                </button>
              ))}
            </nav>
          </div>
        )}

        <p className="menu__footnote">
          Precios en euros. {ALLERGEN_NOTE}
        </p>
      </div>
    </section>
  );
}
