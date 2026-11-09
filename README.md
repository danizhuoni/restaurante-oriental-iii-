# Restaurante Oriental III · 東方大酒店

Website for Restaurante Oriental III (Calle del Real 15, Soto del Real, Madrid). Built with React + Vite.

## Commands

```bash
npm install
npm run dev      # local development server
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run images   # regenerate the WebP images from assets-src/images
```

## Where things live

| What | File |
| --- | --- |
| **Full menu** (dishes, prices, allergens, set menus, drinks) | `src/data/menu.js` |
| Address, hours, phones, map links | `src/data/site.js` |
| Page sections | `src/components/` (`Hero`, `Kitchen`, `Cuisine`, `menu/`, `Visit`) |
| Styles | `src/styles/` |
| Source photos (originals, not shipped) | `assets-src/images/` |
| Optimised photos (generated) | `public/img/` |

### Updating the menu

Edit `src/data/menu.js`. Prices are strings in the printed format (`'4,75'`).
`price: null` shows "Precio a consultar". Allergens use the 1–14 numbering
from the printed menu's legend.

To attach a photo to a dish, add the source image to `assets-src/images/`,
run `npm run images`, and set `image: img('file-name', 'alt text')` on the dish.

### Adding a reservation or online-ordering link

Set `reservationUrl` / `orderUrl` in `src/data/site.js`. The buttons appear
automatically in the contact section; they stay hidden while the value is `null`.

## Notes

- The Chinese font is subset automatically (`scripts/build-zh-font.mjs`) to the
  characters used on the site. It runs before `dev` and `build`.
- Three.js (gold dust in the hero) is lazy-loaded after first paint and is
  skipped for visitors who prefer reduced motion.
