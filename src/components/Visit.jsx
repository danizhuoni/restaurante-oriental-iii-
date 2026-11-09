import { useState } from 'react';
import { SITE } from '../data/site.js';
import { useReveal } from '../lib/hooks.js';
import { Icon, SectionTitle } from './ui.jsx';

export default function Visit() {
  const ref = useReveal();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="contacto" className="visit" ref={ref} aria-labelledby="visit-title">
      <div className="lacquer-texture" aria-hidden="true" />
      <div className="container">
        <SectionTitle eyebrow="V · Visítanos" zh="光臨" title="Visítanos" id="visit-title">
          <p>
            {SITE.address.street}, {SITE.address.locality} ({SITE.address.region})
          </p>
        </SectionTitle>

        <div className="visit__grid">
          <div className="visit__info">
            <article className="info-card" data-reveal>
              <h3 className="info-card__title">
                <Icon.pin /> Dirección
              </h3>
              <address className="info-card__address">
                {SITE.address.street}
                <br />
                {SITE.address.locality}, {SITE.address.region}
                <br />
                {SITE.address.country}
              </address>
              <a className="btn btn--gold btn--block" href={SITE.directions} target="_blank" rel="noopener noreferrer">
                <Icon.pin /> Cómo llegar
                <span className="sr-only"> (abre Google Maps en una nueva pestaña)</span>
              </a>
            </article>

            <article className="info-card" data-reveal>
              <h3 className="info-card__title">
                <Icon.clock /> Horario
              </h3>
              <dl className="hours">
                {SITE.hours.map((h) => (
                  <div className="hours__row" key={h.label}>
                    <dt>
                      {h.label}
                      <span lang="en">{h.en}</span>
                    </dt>
                    <dd>
                      <time>{h.from}</time>
                      <span className="hours__dash" aria-label="a">
                        –
                      </span>
                      <time>{h.to}</time>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="info-card" data-reveal>
              <h3 className="info-card__title">
                <Icon.phone /> Teléfonos
              </h3>
              <ul className="phones">
                {SITE.phones.map((p) => (
                  <li key={p.tel}>
                    <a className="phones__num" href={`tel:${p.tel}`}>
                      {p.display}
                    </a>
                    <a className="btn btn--ghost btn--sm" href={`tel:${p.tel}`} aria-label={`Llamar ahora al ${p.display}`}>
                      <Icon.phone /> Llamar ahora
                    </a>
                  </li>
                ))}
              </ul>
              {SITE.reservationUrl && (
                <a className="btn btn--gold btn--block" href={SITE.reservationUrl}>
                  Reservar
                </a>
              )}
              {SITE.orderUrl && (
                <a className="btn btn--ghost btn--block" href={SITE.orderUrl}>
                  Pedir online
                </a>
              )}
            </article>
          </div>

          <div className="visit__map" data-reveal>
            <div className={`map ${mapLoaded ? 'is-loaded' : ''}`}>
              <iframe
                title={`Mapa: ${SITE.address.full}`}
                src={SITE.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                onLoad={() => setMapLoaded(true)}
              />
              <span className="map__frame" aria-hidden="true" />
            </div>
            <a className="map__link" href={SITE.directions} target="_blank" rel="noopener noreferrer">
              Abrir en Google Maps <Icon.arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
