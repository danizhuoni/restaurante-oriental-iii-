import { dishDomId } from '../../lib/menuNav.js';
import { Allergens, Picture, Price } from '../ui.jsx';

export function Dish({ item, sectionId, showSection }) {
  const photo = item.image;
  return (
    <li id={dishDomId(sectionId, item.code)} className={`dish ${photo ? 'dish--photo' : ''}`}>
      {photo && (
        <div className="dish__photo">
          <Picture name={photo.name} alt={photo.alt} sizes="(max-width: 700px) 100vw, 420px" />
        </div>
      )}
      <div className="dish__body">
        <span className="dish__code" aria-label={`Número ${item.code}`}>
          {item.code}
        </span>
        <div className="dish__text">
          {showSection && <p className="dish__section">{showSection}</p>}
          <p className="dish__name">{item.name}</p>
          {item.en && (
            <p className="dish__en" lang="en">
              {item.en}
            </p>
          )}
          {item.desc && <p className="dish__desc">{item.desc}</p>}
          <Allergens list={item.allergens} />
        </div>
        <span className="dish__leader" aria-hidden="true" />
        <Price value={item.price} className="dish__price" />
      </div>
    </li>
  );
}

export function DishSection({ section, headingLevel = 4 }) {
  const H = `h${headingLevel}`;
  return (
    <section className="menu-sec" id={`sec-${section.id}`} aria-labelledby={`sec-${section.id}-h`}>
      {section.banner && (
        <div className="menu-sec__banner">
          <Picture name={section.banner.name} alt={section.banner.alt} sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>
      )}
      <header className="menu-sec__head">
        <H className="menu-sec__title" id={`sec-${section.id}-h`}>
          {section.title}
        </H>
        {section.en && <p className="menu-sec__en">{section.en}</p>}
      </header>
      <ul className="dish-list">
        {section.items.map((item) => (
          <Dish key={item.code} item={item} sectionId={section.id} />
        ))}
      </ul>
    </section>
  );
}

function Includes({ list }) {
  return (
    <dl className="includes">
      {list.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SetMenu({ section }) {
  return (
    <section className="menu-sec set-menu" id={`sec-${section.id}`} aria-labelledby={`sec-${section.id}-h`}>
      <div className="set-menu__card">
        <header className="set-menu__head">
          <h4 className="set-menu__title" id={`sec-${section.id}-h`}>
            {section.title}
          </h4>
          <Price value={section.price} className="set-menu__price" />
        </header>
        {section.conditions?.map((c) => (
          <p className="set-menu__cond" key={c}>
            {c}
          </p>
        ))}
        <div className="set-menu__courses">
          {section.courses.map((c) => (
            <div className="course" key={c.title}>
              <h5 className="course__title">{c.title}</h5>
              <ol className="course__list">
                {c.options.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <Includes list={section.includes} />
      </div>
    </section>
  );
}

export function BanquetMenus({ section }) {
  return (
    <section className="menu-sec" id={`sec-${section.id}`} aria-labelledby={`sec-${section.id}-h`}>
      {section.banner && (
        <div className="menu-sec__banner">
          <Picture name={section.banner.name} alt={section.banner.alt} sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>
      )}
      <header className="menu-sec__head">
        <h4 className="menu-sec__title" id={`sec-${section.id}-h`}>
          {section.title}
        </h4>
      </header>
      <div className="banquet-grid">
        {section.menus.map((m) => (
          <article className="banquet-card" key={m.title}>
            <header>
              <h5 className="banquet-card__title">{m.title}</h5>
              <Price value={m.price} className="banquet-card__price" />
            </header>
            <ol>
              {m.dishes.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <p className="includes-title">Los menús incluyen:</p>
      <Includes list={section.includes} />
    </section>
  );
}

export function Drinks({ section }) {
  return (
    <section className="menu-sec" id={`sec-${section.id}`} aria-labelledby={`sec-${section.id}-h`}>
      <header className="menu-sec__head">
        <h4 className="menu-sec__title" id={`sec-${section.id}-h`}>
          {section.title}
        </h4>
      </header>
      <div className="drinks-grid">
        {section.groups.map((g) => (
          <table className="drinks" key={g.title}>
            <caption>{g.title}</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Bebida</span>
                </th>
                {g.columns.map((c) => (
                  <th scope="col" key={c}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.items.map((it) => (
                <tr key={it.name}>
                  <th scope="row">{it.name}</th>
                  {it.prices.map((p, i) => (
                    <td key={i}>{p ? <Price value={p} /> : <span className="na" aria-label="No disponible">—</span>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </section>
  );
}

export function SectionBlock({ section }) {
  if (section.type === 'set') return <SetMenu section={section} />;
  if (section.type === 'banquet') return <BanquetMenus section={section} />;
  if (section.type === 'drinks') return <Drinks section={section} />;
  return <DishSection section={section} />;
}
