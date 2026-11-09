import { NAV, SITE } from '../data/site.js';
import { AnchorLink, Ornament } from './ui.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__zh" lang="zh-Hant">
            {SITE.zh}
          </span>
          <p className="footer__name">{SITE.name}</p>
          <p className="footer__sub">{SITE.cuisines}</p>
        </div>
        <Ornament />
        <nav aria-label="Pie de página">
          <ul className="footer__nav">
            {NAV.map((n) => (
              <li key={n.id}>
                <AnchorLink to={n.id}>{n.label}</AnchorLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer__line">
          {SITE.address.full.replace(', Spain', '')} ·{' '}
          {SITE.phones.map((p, i) => (
            <span key={p.tel}>
              {i > 0 && ' · '}
              <a href={`tel:${p.tel}`}>{p.display}</a>
            </span>
          ))}
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} {SITE.name}</p>
      </div>
    </footer>
  );
}
