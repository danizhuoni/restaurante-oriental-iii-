import { useRef } from 'react';
import { ALL_DISHES, MENU } from '../data/menu.js';
import { useReveal, useScrollVars } from '../lib/hooks.js';
import { goToMenu } from '../lib/menuNav.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { Allergens, Icon, Picture, Price, SectionTitle } from './ui.jsx';

const dish = (sectionId, code) => ALL_DISHES.find((d) => d.sectionId === sectionId && d.code === code);
const minPrice = (items) => {
  const nums = items.map((i) => i.price).filter(Boolean);
  return nums.sort((a, b) => parseFloat(a.replace(',', '.')) - parseFloat(b.replace(',', '.')))[0];
};
const section = (id) => MENU.flatMap((g) => g.sections).find((s) => s.id === id);

// Featured entries reference the menu data so names and prices stay in sync.
const pato = dish('pato', '61');
const arroz = dish('arroz-pasta', '18');
const rollo = dish('entrantes', '5');
const dimSum = section('dim-sum');
const noodles = section('arroz-pasta').items.filter((i) => /^(Tallarines|Fideos|Ku-Bak)/.test(i.name));

const FEATURES = [
  {
    key: 'pato',
    zh: '北京烤鴨',
    image: pato.image,
    kicker: `Nº ${pato.code} · Pato`,
    title: pato.name,
    en: pato.en,
    allergens: pato.allergens,
    price: pato.price,
    target: { group: 'china', section: 'pato', code: pato.code },
  },
  {
    key: 'dimsum',
    zh: '點心',
    image: dimSum.banner,
    kicker: 'C5 – C12 · Dim Sum',
    title: 'Dim Sum',
    en: dimSum.items
      .filter((i) => !i.name.startsWith('Menú'))
      .map((i) => i.name)
      .join(' · '),
    from: minPrice(dimSum.items),
    target: { group: 'dimsum', section: 'dim-sum' },
  },
  {
    key: 'arroz',
    zh: '炒飯',
    image: arroz.image,
    kicker: `Nº ${arroz.code} · Pasta y arroz`,
    title: arroz.name,
    allergens: arroz.allergens,
    price: arroz.price,
    target: { group: 'china', section: 'arroz-pasta', code: arroz.code },
  },
  {
    key: 'noodles',
    zh: '炒麵',
    image: section('arroz-pasta').banner,
    kicker: 'Nº 23 – 28A · Pasta y arroz',
    title: 'Tallarines, fideos de arroz y Ku-Bak',
    en: `${noodles.length} preparaciones en la carta`,
    from: minPrice(noodles),
    target: { group: 'china', section: 'arroz-pasta', code: '23' },
  },
  {
    key: 'rollo',
    zh: '春卷',
    image: rollo.image,
    kicker: `Nº ${rollo.code} · Entrantes`,
    title: rollo.name,
    en: rollo.en,
    allergens: rollo.allergens,
    price: rollo.price,
    target: { group: 'china', section: 'entrantes', code: rollo.code },
  },
];

/** Mouse-driven 3D tilt for the dish photographs (fine pointers only). */
function useTilt() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };
  return { ref, onPointerMove: onMove, onPointerLeave: onLeave };
}

function Feature({ f, index }) {
  const tilt = useTilt();
  const parallax = useScrollVars();
  return (
    <article className={`feature ${index % 2 ? 'feature--flip' : ''}`} data-reveal>
      <div className="feature__media" ref={parallax}>
        <div className="feature__frame" {...tilt}>
          <Picture name={f.image.name} alt={f.image.alt} sizes="(max-width: 900px) 100vw, 58vw" className="feature__img" />
          <span className="feature__corner feature__corner--tl" aria-hidden="true" />
          <span className="feature__corner feature__corner--br" aria-hidden="true" />
        </div>
        <span className="feature__zh" lang="zh-Hant" aria-hidden="true">
          {f.zh}
        </span>
      </div>
      <div className="feature__body">
        <p className="feature__kicker">{f.kicker}</p>
        <h3 className="feature__title">{f.title}</h3>
        {f.en && <p className="feature__en">{f.en}</p>}
        <Allergens list={f.allergens} />
        <div className="feature__foot">
          {f.from ? (
            <p className="feature__price">
              <span className="feature__from">desde</span> <Price value={f.from} />
            </p>
          ) : (
            <p className="feature__price">
              <Price value={f.price} />
            </p>
          )}
          <button type="button" className="link-btn" onClick={() => goToMenu(f.target)}>
            Ver en la carta <Icon.arrow />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Cuisine() {
  const ref = useReveal();
  const banquet = useScrollVars();
  const casa = section('menus-casa');

  return (
    <section className="cuisine" ref={ref} aria-labelledby="cuisine-title">
      <div className="lacquer-texture" aria-hidden="true" />
      <div className="container">
        <SectionTitle eyebrow="III · La cocina imperial" zh="御膳" title="La Cocina Imperial" id="cuisine-title">
          <p>Algunos de los platos de nuestra carta.</p>
        </SectionTitle>
        <div className="features">
          {FEATURES.map((f, i) => (
            <Feature key={f.key} f={f} index={i} />
          ))}
        </div>
      </div>

      <div className="banquet" ref={banquet}>
        <div className="banquet__bg">
          <Picture name={casa.banner.name} alt={casa.banner.alt} sizes="100vw" className="banquet__img" />
        </div>
        <div className="banquet__shade" aria-hidden="true" />
        <div className="banquet__content" data-reveal>
          <span className="banquet__zh" lang="zh-Hant" aria-hidden="true">
            宴
          </span>
          <p className="eyebrow">Para compartir</p>
          <h3 className="banquet__title">{casa.title}</h3>
          <ul className="banquet__list">
            {casa.menus.map((m) => (
              <li key={m.title}>
                <span>{m.title}</span>
                <Price value={m.price} />
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--gold" onClick={() => goToMenu({ group: 'menus', section: 'menus-casa' })}>
            Ver los menús <Icon.arrow />
          </button>
        </div>
      </div>
    </section>
  );
}
