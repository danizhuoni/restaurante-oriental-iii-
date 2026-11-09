import { useInView, useScrollVars } from '../lib/hooks.js';
import Embers from './Embers.jsx';
import { Picture } from './ui.jsx';

const CHAPTERS = [
  {
    zh: '火',
    title: 'El arte del fuego',
    text: 'La cocina china nace del fuego. El wok se alza sobre la llama viva y, en un instante, el aceite, el aroma y el vapor se convierten en un plato.',
  },
  {
    zh: '鑊',
    title: 'Del wok a la mesa',
    text: 'Salteados, platos a la plancha, sopas, arroces, tallarines y dim sum: nuestra carta recorre los grandes clásicos de la cocina china.',
  },
  {
    zh: '和',
    title: 'Y también, Japón',
    text: 'Sashimi, maki, rolls, sushi y tempura completan una carta pensada también para compartir, con menús para dos y hasta seis personas.',
  },
];

/*
 * A pinned scene: the section is ~3 viewports tall, the stage sticks to the
 * top, and --through (0 → 1, set by useScrollVars) drives the camera push-in
 * and which chapter is visible. With reduced motion the chapters simply stack.
 */
export default function Kitchen() {
  const ref = useScrollVars();
  const inView = useInView(ref);

  return (
    <section className="kitchen" ref={ref} aria-labelledby="kitchen-title">
      <div className="kitchen__sticky">
        <div className="kitchen__bg">
          <Picture name="cocina-wok" alt="Cocinero salteando ingredientes en un wok sobre una gran llama" className="kitchen__img" sizes="100vw" />
        </div>
        <div className="kitchen__glow" aria-hidden="true" />
        <div className="smoke" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <Embers active={inView} />
        <div className="kitchen__shade" aria-hidden="true" />

        <div className="kitchen__copy">
          <p className="eyebrow kitchen__eyebrow">II · El arte de cocinar</p>
          <h2 id="kitchen-title" className="sr-only">
            El arte de cocinar
          </h2>
          {CHAPTERS.map((c, i) => (
            <article key={c.title} className="chapter" style={{ '--i': i }}>
              <span className="chapter__zh" lang="zh-Hant" aria-hidden="true">
                {c.zh}
              </span>
              <h3 className="chapter__title">{c.title}</h3>
              <p className="chapter__text">{c.text}</p>
            </article>
          ))}
        </div>

        <div className="kitchen__progress" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <span key={c.title} style={{ '--i': i }} />
          ))}
        </div>
      </div>
    </section>
  );
}
