// Datos del restaurante. Solo información facilitada por el propietario.
const ADDRESS = 'Calle del Real 15, Soto del Real, Madrid, Spain';
const q = encodeURIComponent(ADDRESS);

export const SITE = {
  name: 'Restaurante Oriental III',
  zh: '東方大酒店',
  cuisines: 'Cocina china y japonesa',
  address: {
    street: 'Calle del Real 15',
    locality: 'Soto del Real',
    region: 'Madrid',
    country: 'España',
    full: ADDRESS,
  },
  hours: [
    { label: 'Comida', en: 'Lunch', from: '13:00', to: '16:30' },
    { label: 'Cena', en: 'Dinner', from: '20:15', to: '23:30' },
  ],
  phones: [
    { display: '918 48 02 34', tel: '+34918480234' },
    { display: '690 02 12 18', tel: '+34690021218' },
  ],
  mapEmbed: `https://www.google.com/maps?q=${q}&z=16&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  // No hay enlace de reservas ni de pedidos online: estos botones no se muestran.
  reservationUrl: null,
  orderUrl: null,
};

export const NAV = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'cocina', label: 'Nuestra cocina' },
  { id: 'carta', label: 'Carta' },
  { id: 'contacto', label: 'Contacto' },
];
