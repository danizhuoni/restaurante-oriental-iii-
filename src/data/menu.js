/*
 * Carta completa del Restaurante Oriental III (東方大酒店).
 *
 * Fuente: las 10 páginas escaneadas de Carta_Actualizada_Fotos (545–554.JPG).
 * Nombres, números y precios se transcriben literalmente de esas páginas.
 * Los nombres de los platos 18, 19 y 20 quedan tapados por una foto en la
 * página 546; se completan con Carta_Actualizada.docx (el precio sí es visible
 * en la página escaneada). El 18A (Arroz frito con jamón estilo chino) se
 * ha retirado de la carta a petición del restaurante.
 *
 * Alérgenos: números del 1 al 14 según la leyenda de la propia carta,
 * transcritos de los iconos de cada plato.
 *
 * price: cadena con el formato original ("4,75"). null = no figura en la carta.
 */

export const ALLERGENS = {
  1: 'Gluten',
  2: 'Crustáceos',
  3: 'Huevos',
  4: 'Pescado',
  5: 'Cacahuetes',
  6: 'Soja',
  7: 'Lácteos',
  8: 'Frutos de cáscara',
  9: 'Apio',
  10: 'Mostaza',
  11: 'Sésamo',
  12: 'Azufre y sulfitos',
  13: 'Moluscos',
  14: 'Altramuces',
};

export const ALLERGEN_NOTE =
  'Si tienes alguna alergia alimentaria, consúltanos con antelación, por favor.';

const img = (name, alt) => ({ name, alt });

export const MENU = [
  /* ───────────────────────── COCINA CHINA ───────────────────────── */
  {
    id: 'china',
    title: 'Cocina China',
    zh: '中餐',
    sections: [
      {
        id: 'entrantes',
        title: 'Entrantes',
        en: 'Starters',
        items: [
          { code: '1', name: 'Ensalada china', en: 'Chinese salad', price: '4,75', allergens: [12] },
          { code: '3', name: 'Ensalada especial de la casa', en: 'Special salad of the house', price: '6,75', allergens: [12] },
          { code: '3A', name: 'Ensalada de gambas', en: 'Shrimps salad', price: '6,25', allergens: [2] },
          { code: '4', name: 'Rollo de primavera', en: 'Spring roll', price: '2,35', allergens: [1] },
          {
            code: '5',
            name: 'Rollo de Vietnam (4 unid.)',
            en: 'Vietnamese roll (4 units)',
            price: '4,50',
            allergens: [1],
            image: img('rollitos-vietnam', 'Rollitos de Vietnam dorados con salsa para mojar'),
          },
          { code: '6', name: 'Wan-Tun frito', en: 'Fried Wan-Tun', price: '4,95', allergens: [1] },
          { code: '7', name: 'Corteza de gambas', en: 'Shrimps crusts', price: '3,95', allergens: [1] },
          { code: '8', name: 'Entremeses variados especial', en: "Special various hors d'oeuvre", price: '11,50', allergens: [1, 2, 4] },
          { code: '9', name: 'Pan chino', en: 'Chinese bread', price: '2,25', allergens: [1] },
          { code: '10', name: 'Empanadillas chinas a la plancha', en: 'Grilled chinese dumpling', price: '8,35', allergens: [1] },
          { code: '11', name: 'Dou fu especial de la casa', en: 'Special Dou Fu of house', price: '6,95', allergens: [6] },
          { code: '12', name: 'Dou fu con salsa picante', en: 'Dou Fu with hot sauce', price: '6,95', allergens: [6] },
          { code: '13', name: 'Familia feliz', en: 'Happy family', price: '10,50', allergens: [2, 6] },
        ],
      },
      {
        id: 'sopas',
        title: 'Sopas',
        en: 'Soup',
        items: [
          { code: '14', name: 'Sopa de aletas de tiburón', en: "Shark's fin soup", price: '5,85', allergens: [2, 6] },
          { code: '15', name: 'Sopa agripicante', en: 'Sour & hot soup', price: '5,25', allergens: [3] },
          { code: '16', name: 'Sopa de Wan-Tun al estilo chino', en: 'Wan-Tun soup in chinese style', price: '5,50', allergens: [1] },
          { code: '17', name: 'Sopa de maíz con carne de cangrejo', en: 'Corn soup with crab meat', price: '5,50', allergens: [2] },
          { code: '17A', name: 'Sopa de pollo con hongos chinos', en: 'Chicken soup with chinese fungus', price: '5,25', allergens: [] },
          { code: '17B', name: 'Sopa de tomate', en: 'Tomato soup', price: '5,25', allergens: [] },
        ],
      },
      {
        id: 'arroz-pasta',
        title: 'Pasta y Arroz',
        en: 'Pasta and rice',
        banner: img('noodles', 'Tallarines salteados al wok levantados con palillos'),
        items: [
          {
            code: '18',
            name: 'Arroz frito con 3 delicias',
            en: 'Fried rice with 3 delights',
            price: '5,95',
            allergens: [3],
            image: img('arroz-tres-delicias', 'Arroz frito tres delicias con huevo, jamón y guisantes en un cuenco negro'),
          },
          { code: '19', name: 'Arroz frito con gambas', en: 'Fried rice with shrimps', price: '6,25', allergens: [2] },
          { code: '20', name: 'Arroz frito con mil delicias', en: 'Fried rice with thousand delights', price: '7,80', allergens: [2, 3, 6] },
          { code: '21', name: 'Arroz blanco', en: 'White rice', price: '2,80', allergens: [] },
          { code: '22', name: 'Arroz frito con curry', en: 'Fried rice with curry', price: '6,85', allergens: [6] },
          { code: '22A', name: 'Arroz frito con ternera', en: 'Fried rice with beef', price: '6,95', allergens: [6] },
          { code: '22B', name: 'Arroz frito con cerdo', en: 'Fried rice with pork', price: '5,95', allergens: [3] },
          { code: '22C', name: 'Arroz frito con pollo', en: 'Fried rice with chicken', price: '6,55', allergens: [3] },
          { code: '23', name: 'Tallarines fritos con 3 delicias', en: 'Fried noodles with 3 delights', price: '7,25', allergens: [3] },
          { code: '23A', name: 'Tallarines fritos con ternera', en: 'Noodles with beef', price: '7,35', allergens: [6] },
          { code: '24', name: 'Tallarines fritos con gambas', en: 'Fried noodles with shrimps', price: '7,25', allergens: [2] },
          { code: '25', name: 'Tallarines fritos especial a la plancha', en: 'Grilled special noodles', price: '8,45', allergens: [2, 6] },
          { code: '25A', name: 'Tallarines fritos con pollo', en: 'Noodles with chicken', price: '7,15', allergens: [6] },
          { code: '26', name: 'Fideos de arroz salteada con 3 delicias', en: 'Sautéed rice noodles with 3 delights', price: '8,50', allergens: [2, 3, 6] },
          { code: '27', name: 'Ku-Bak con 3 delicias', en: 'Ku-Bak with 3 delights', price: '9,50', allergens: [2, 3] },
          { code: '28', name: 'Ku-Bak con gambas', en: 'Ku-Bak with shrimps', price: '9,55', allergens: [2] },
          { code: '28A', name: 'Ku-Bak con fideos fritos', en: 'Ku-Bak with fried noodles', price: '9,85', allergens: [6] },
        ],
      },
      {
        id: 'vegetariana',
        title: 'Comida Vegetariana',
        en: 'Vegetarian food',
        items: [
          { code: '29', name: 'Bolitas de verdura fritas', en: 'Fried vegetable balls', price: '7,35', allergens: [1, 3] },
          { code: '30', name: 'Verduras variadas salteadas', en: 'Sautéed various vegetables', price: '6,95', allergens: [] },
          { code: '31', name: 'Bambú y setas chinas salteadas', en: 'Sautéed chinese bamboo & mushrooms', price: '7,75', allergens: [] },
        ],
      },
      {
        id: 'pescado',
        title: 'Pescado y Mariscos',
        en: 'Fish and seafood',
        items: [
          { code: '32', name: 'Gambas salteadas con champiñones', en: 'Sautéed shrimps with mushrooms', price: '8,95', allergens: [2] },
          { code: '33', name: 'Verduras con gambas', en: 'Vegetables with shrimps', price: '8,95', allergens: [2] },
          { code: '34', name: 'Gambas salteadas con bambú y setas chinas', en: 'Sautéed shrimps with bamboo & chinese mushrooms', price: '9,05', allergens: [2] },
          { code: '35', name: 'Gambas rebozadas en salsa agridulce', en: 'Roasted shrimps in sweet & sour sauce', price: '8,95', allergens: [1, 2] },
          { code: '35A', name: 'Gambas con salsa picante', en: 'Shrimps with hot sauce', price: '9,05', allergens: [2] },
          { code: '35B', name: 'Gambas con brócoli', en: 'Shrimps with broccoli', price: '9,05', allergens: [2] },
          { code: '36', name: 'Langostinos fritos rebozados', en: 'Fried prawns', price: '10,95', allergens: [1, 2] },
          { code: '36A', name: 'Rollitos de langostinos', en: 'Prawns rolls', price: '6,95', allergens: [2] },
          { code: '36B', name: 'Gambas al curry', en: 'Shrimps with curry', price: '8,95', allergens: [6] },
          { code: '37', name: 'Langostinos a la plancha', en: 'Grilled prawns', price: '14,95', allergens: [2] },
          { code: '37A', name: 'Langostinos especial chinos', en: 'Chinese special prawns', price: '14,95', allergens: [2] },
          { code: '38', name: 'Chipirones con salsa especial a la plancha', en: 'Grilled cuttlefish with special sauce', price: '9,95', allergens: [13] },
          { code: '39', name: 'Calamares salteados con picante y cebolla', en: 'Sautéed cuttlefish with spicy & onion', price: '9,95', allergens: [13] },
          { code: '40', name: 'Pescado agridulce', en: 'Sweet & sour fish', price: '7,75', allergens: [1, 3, 4, 12] },
        ],
      },
      {
        id: 'carnes',
        title: 'Carnes',
        en: 'Meats',
        items: [
          { code: '41', name: 'Ternera con salsa de ostras', en: 'Beef with oyster sauce', price: '10,50', allergens: [13] },
          { code: '42', name: 'Ternera con verduras', en: 'Beef with vegetables', price: '9,95', allergens: [6] },
          { code: '43', name: 'Ternera con pimientos verdes', en: 'Beef with green peppers', price: '9,95', allergens: [6] },
          { code: '44', name: 'Ternera con cebolla', en: 'Beef with onion', price: '9,85', allergens: [6] },
          { code: '45', name: 'Ternera salteada con salsa picante', en: 'Sautéed beef with hot sauce', price: '10,50', allergens: [6] },
          { code: '46', name: 'Ternera con champiñones', en: 'Sautéed beef with mushrooms', price: '9,95', allergens: [6] },
          { code: '47', name: 'Ternera especial a la plancha', en: 'Grilled special beef', price: '10,45', allergens: [] },
          { code: '48', name: 'Ternera salteada con patatas fritas', en: 'Sautéed beef with chips', price: '9,95', allergens: [] },
          { code: '49', name: 'Ternera con brotes de bambú y setas chinas', en: 'Beef with bamboo sprouts and chinese mushrooms', price: '10,45', allergens: [6] },
          { code: '49A', name: 'Ternera crujiente con salsa de naranja', en: 'Crispy beef with orange sauce', price: '9,95', allergens: [] },
          { code: '67', name: 'Ternera al curry', en: 'Beef with curry', price: '9,95', allergens: [6] },
          { code: '50', name: 'Cerdo agridulce', en: 'Sweet & sour pork', price: '7,95', allergens: [1, 3, 12] },
          { code: '51', name: 'Costillas asadas', en: 'Roasted spare ribs', price: '9,50', allergens: [] },
          { code: '52', name: 'Lomo de cerdo a la barbacoa con miel', en: 'Pork loin barbecue with honey', price: '9,25', allergens: [] },
        ],
      },
      {
        id: 'pollo',
        title: 'Pollo',
        en: 'Chicken',
        items: [
          { code: '53', name: 'Pollo al curry', en: 'Chicken with curry', price: '7,95', allergens: [6] },
          { code: '54', name: 'Pollo con almendras', en: 'Chicken with almonds', price: '7,95', allergens: [8] },
          { code: '54A', name: 'Pollo salteado con salsa picante', en: 'Sautéed chicken with hot sauce', price: '7,95', allergens: [] },
          { code: '55', name: 'Pollo frito estilo chino con almendras', en: 'Fried chicken with almonds in chinese style', price: '8,25', allergens: [8] },
          { code: '56', name: 'Pollo al limón', en: 'Chicken with lemon', price: '8,45', allergens: [] },
          { code: '57', name: 'Pollo con piña', en: 'Chicken with pineapple', price: '8,35', allergens: [] },
          { code: '58', name: 'Bolitas de pollo fritas', en: 'Fried chicken balls', price: '7,80', allergens: [1, 3] },
          { code: '59', name: 'Pollo con bambú y setas chinas', en: 'Chicken with bamboo & chinese mushrooms', price: '8,45', allergens: [] },
          { code: '60', name: 'Pollo a la plancha', en: 'Grilled chicken', price: '8,50', allergens: [] },
          { code: '60A', name: 'Pollo agridulce', en: 'Sweet & sour chicken', price: '8,25', allergens: [1, 3, 12] },
          { code: '60B', name: 'Pollo con brócoli', en: 'Chicken with broccoli', price: '8,25', allergens: [] },
          { code: '60C', name: 'Pollo con champiñones', en: 'Chicken with mushrooms', price: '8,15', allergens: [] },
          { code: '69', name: 'Filete de pollo con patatas fritas', en: 'Chicken fillet with chips', price: '7,25', allergens: [] },
          { code: '70', name: 'Filete de pollo con huevo frito', en: 'Chicken fillet with fried egg', price: '7,35', allergens: [3] },
          { code: '71', name: 'Pollo con verduras', en: 'Chicken with vegetables', price: '7,85', allergens: [] },
        ],
      },
      {
        id: 'pato',
        title: 'Pato',
        en: 'Duck',
        items: [
          {
            code: '61',
            name: 'Pato laqueado pekinés',
            en: 'Peking lacquered duck',
            price: '15,50',
            allergens: [1, 3, 6, 11],
            image: img('pato-laqueado', 'Pato laqueado pekinés cortado en láminas sobre fuente negra'),
          },
          { code: '62', name: 'Pato frito', en: 'Fried duck', price: '10,75', allergens: [] },
          { code: '63', name: 'Pato asado a la naranja', en: 'Roasted duck with orange', price: '10,85', allergens: [] },
          { code: '64', name: 'Pato a la plancha', en: 'Grilled duck', price: '10,95', allergens: [] },
          { code: '66', name: 'Pato con almendras', en: 'Duck with almonds', price: '10,95', allergens: [8] },
          { code: '67A', name: 'Pato con bambú y setas chinas', en: 'Duck with bamboo & chinese mushrooms', price: '10,95', allergens: [] },
        ],
      },
      {
        id: 'tailandes',
        title: 'Especialidades Orientales',
        en: 'Estilo tailandés · Thai style',
        items: [
          { code: 'A6', name: 'Gambas salteadas con salsa picante', en: 'Sautéed shrimps with hot sauce', price: '9,75', allergens: [2] },
          { code: 'A7', name: 'Ternera salteada con salsa picante', en: 'Sautéed beef with hot sauce', price: '10,50', allergens: [] },
          { code: 'A8', name: 'Pollo salteado con salsa picante', en: 'Sautéed chicken with hot sauce', price: '8,95', allergens: [] },
          { code: 'A9', name: 'Pieza de pescado con salsa picante', en: 'Fish fillet with hot sauce', price: '8,95', allergens: [] },
          { code: 'A11', name: 'Cazuela de pollo con curry en salsa picante', en: 'Chicken in pot with hot curry sauce', price: '9,50', allergens: [6] },
          { code: 'A12', name: 'Arroz tailandés frito', en: 'Thai fried rice', price: '6,95', allergens: [6] },
        ],
      },
    ],
  },

  /* ───────────────────────── DIM SUM ───────────────────────── */
  {
    id: 'dimsum',
    title: 'Dim Sum',
    zh: '點心',
    sections: [
      {
        id: 'dim-sum',
        title: 'Dim Sum',
        banner: img('dumplings', 'Cesta de bambú con empanadillas al vapor'),
        items: [
          { code: 'C5', name: 'Ha Gao', desc: 'Jade empanadilla con relleno de gambas, zanahorias, bambú, etc.', price: '4,95', allergens: [1, 2] },
          { code: 'C7', name: 'Zha Guo Tie', desc: 'Raviolis fritos, empanadilla frita con relleno de lomo, verduras, etc.', price: '4,95', allergens: [1] },
          { code: 'C8', name: 'Samosa', desc: 'Relleno de pollo, salsa de curry, verduras, etc.', price: '4,95', allergens: [] },
          { code: 'C9', name: 'Siu Lug Bau', desc: 'Bolita de pan con relleno de lomo, verduras, nabos y cebolletas.', price: '4,95', allergens: [1] },
          { code: 'C10', name: 'Siu Mai', desc: 'Relleno de lomo, gambas y setas, etc.', price: '4,95', allergens: [1, 2, 6] },
          { code: 'C11', name: 'Menú variado para 2 personas', price: '8,65', allergens: [] },
          { code: 'C12', name: 'Menú variado para 3 personas', price: '12,65', allergens: [] },
        ],
      },
    ],
  },

  /* ───────────────────────── COCINA JAPONESA ───────────────────────── */
  {
    id: 'japonesa',
    title: 'Cocina Japonesa',
    zh: '日本料理',
    sections: [
      {
        id: 'sashimi',
        title: 'Sashimi',
        items: [
          { code: 'B1', name: 'Sashimi variado, 9 cortes', desc: '3 atún, 3 salmón, 3 lubina', price: '13,95', allergens: [4] },
          { code: 'B2', name: 'Sashimi de atún, 9 cortes', price: '14,50', allergens: [4] },
          { code: 'B3', name: 'Sashimi de salmón, 9 cortes', price: '14,50', allergens: [4] },
          { code: 'B4', name: 'Sashimi variado, 20 cortes', desc: 'atún, salmón, lubina, vieira, pez mantequilla, etc.', price: '28,95', allergens: [4] },
          { code: 'B5', name: 'Tartar de atún con aguacate', price: '16,95', allergens: [4] },
          { code: 'B6', name: 'Tartar de salmón con aguacate', price: '14,95', allergens: [4] },
        ],
      },
      {
        id: 'maki',
        title: 'Maki',
        en: '8 piezas',
        items: [
          { code: 'B7', name: 'Maki atún', desc: 'atún envuelto en algas', price: '5,50', allergens: [4] },
          { code: 'B8', name: 'Maki salmón', desc: 'salmón envuelto en algas', price: '5,50', allergens: [4] },
          { code: 'B9', name: 'Maki Philadelphia', desc: 'salmón y queso philadelphia envuelto en algas', price: '5,75', allergens: [4, 7] },
          { code: 'B10', name: 'Maki ebi', desc: 'langostino con aguacate y pepino envuelto en algas', price: '5,75', allergens: [2] },
          { code: 'B11', name: 'Maki salmón con aguacate', desc: 'salmón con aguacate envuelto en algas', price: '5,95', allergens: [4] },
          { code: 'B12', name: 'Maki surimi', desc: 'surimi con aguacate y pepino envuelto en algas', price: '5,75', allergens: [2] },
          { code: 'B13', name: 'Maki spicy tuna', desc: 'atún macerado envuelto en algas picante', price: '5,95', allergens: [4] },
          { code: 'B14', name: 'Maki anguila', desc: 'anguila con aguacate', price: '7,85', allergens: [4] },
          { code: 'B15', name: 'Maki vegetal', desc: 'aguacate y pepino', price: '4,50', allergens: [] },
          { code: 'B16', name: 'Futomaki, 10 piezas', desc: 'atún, salmón, pez mantequilla, lubina, gambas, surimi, aguacate', price: '15,95', allergens: [4, 2] },
        ],
      },
      {
        id: 'roll',
        title: 'Roll',
        en: '8 piezas',
        items: [
          { code: 'B17', name: 'California Roll', desc: 'gambas, aguacate y pepino envuelto en tobico', price: '11,95', allergens: [2] },
          { code: 'B18', name: 'City Roll', desc: 'salmón, aguacate y queso philadelphia envuelto en sésamo', price: '8,50', allergens: [4, 7, 11] },
          { code: 'B19', name: 'Gambas Roll', desc: 'gambas, aguacate y pepino envuelto en sésamo', price: '8,50', allergens: [2, 11] },
          { code: 'B20', name: 'Sésamo Roll', desc: 'surimi, aguacate y pepino envuelto en sésamo', price: '8,50', allergens: [2] },
          { code: 'B21', name: 'Salmón Roll', desc: 'salmón y aguacate envuelto en sésamo', price: '8,95', allergens: [4, 11] },
          { code: 'B22', name: 'Aguacate Uramaki', desc: 'gambas envueltas en aguacate', price: '9,50', allergens: [2] },
          { code: 'B23', name: 'Salmón Uramaki', desc: 'salmón y aguacate envueltos en salmón', price: '9,95', allergens: [4] },
        ],
      },
      {
        id: 'sushi',
        title: 'Sushi',
        en: '3 piezas',
        items: [
          { code: 'B24', name: 'Sushi de atún', price: '4,65', allergens: [4] },
          { code: 'B25', name: 'Sushi de gambas', price: '4,35', allergens: [2] },
          { code: 'B26', name: 'Sushi de salmón', price: '4,50', allergens: [] },
        ],
      },
      {
        id: 'tempura',
        title: 'Tempura',
        items: [
          { code: 'B27', name: 'Tempura de langostinos a la japonesa', price: '9,65', allergens: [1] },
          { code: 'B28', name: 'Tempura de verduras', price: '7,50', allergens: [1] },
        ],
      },
      {
        id: 'novedades',
        title: 'Novedades',
        items: [
          { code: 'B29', name: 'Empanadilla Japonesa', price: '8,35', allergens: [1] },
          { code: 'B30', name: 'Ensalada de algas de la casa', price: '6,75', allergens: [] },
          { code: 'B31', name: 'Sopa de miso con tofu', price: '6,25', allergens: [] },
          { code: 'B32', name: 'Tira de solomillo de cerdo crujiente caramelizado con sabor a naranja', desc: 'ligeramente picante', price: '9,50', allergens: [1] },
        ],
      },
      {
        id: 'entremeses-japoneses',
        title: 'Entremeses Variados',
        items: [
          { code: 'A', name: 'Entremeses Variados Especial A', desc: '2 Sushi atún, 2 Sushi salmón, 4 Maki atún, 4 Maki salmón', price: '13,50', allergens: [] },
          { code: 'B', name: 'Entremeses Variados Especial B', desc: '2 Sushi atún, 2 Sushi salmón, 2 Sushi gambas', price: '12,95', allergens: [] },
          { code: 'C', name: 'Entremeses Variados Especial C', desc: '4 Maki ebi, 4 Maki surimi, 4 Maki atún, 4 Maki salmón', price: '10,95', allergens: [] },
          { code: 'D', name: 'Entremeses Variados Especial D', desc: '2 Sushi atún, 2 Sushi salmón, 3 Cortes atún, 3 Cortes salmón', price: '16,65', allergens: [] },
          { code: 'E', name: 'Entremeses Variados Especial E', desc: '4 Maki atún, 4 Maki salmón, 3 Cortes atún, 3 Cortes salmón', price: '13,95', allergens: [] },
          { code: 'F', name: 'Entremeses Variados Especial F', desc: '4 Maki atún, 4 Maki salmón, 3 Cortes atún, 3 Cortes salmón, 2 Sushi atún, 2 Sushi salmón', price: '19,95', allergens: [] },
        ],
      },
    ],
  },

  /* ───────────────────────── MENÚS ───────────────────────── */
  {
    id: 'menus',
    title: 'Menús',
    zh: '套餐',
    sections: [
      {
        id: 'menu-del-dia',
        type: 'set',
        title: 'Menú del Día',
        price: '12,50',
        conditions: [
          'De lunes a viernes, solo al mediodía, no válido festivos ni fin de semana.',
          'No válido para llevar.',
        ],
        courses: [
          { title: 'Primero', options: ['Ensalada', 'Rollo de primavera', 'Sopa agripicante', 'Pan chino'] },
          { title: 'Segundo', options: ['Arroz frito con 3 delicias', 'Arroz blanco', 'Tallarines fritos con 3 delicias', 'Arroz frito con cerdo'] },
          {
            title: 'Tercero',
            options: ['Cerdo agridulce', 'Pollo con almendras', 'Pollo al limón', 'Pollo al curry', 'Ternera al curry', 'Ternera con champiñones', 'Ternera con cebolla', 'Ternera con verduras'],
          },
        ],
        includes: [
          ['Bebidas', 'Copa de vino, cerveza, agua, casera o refresco'],
          ['Postres', 'Helado, flan, fruta, café o té'],
        ],
      },
      {
        id: 'menu-especial-del-dia',
        type: 'set',
        title: 'Menú Especial del Día',
        price: '13,95',
        conditions: ['Para llevar no incluye postre.'],
        courses: [
          { title: '1. Platos', options: ['Rollo de primavera', 'Ensalada china', 'Sopa agripicante', 'Sopa con maíz', 'Sopa de Fideo con pollo'] },
          { title: '2. Platos', options: ['Arroz frito con gambas', 'Arroz blanco', 'Tallarines fritos con gambas', 'Pan chino', 'Fideos de arroz frito con 3 delicias'] },
          {
            title: '3. Platos',
            options: ['Ternera con bambú y setas chinas', 'Cerdo agridulce', 'Gambas con champiñones', 'Pato a la naranja', 'Pato con almendras', 'Pollo al curry', 'Ternera con salsa picante al estilo tailandés', 'Pollo frito al estilo chino con almendras'],
          },
        ],
        includes: [
          ['Bebidas', 'Copa de vino, cerveza, agua, casera o refresco'],
          ['Postres', 'Helado, flan, fruta, café o té'],
        ],
      },
      {
        id: 'menus-casa',
        type: 'banquet',
        title: 'Menús Especiales de la Casa',
        banner: img('banquete', 'Mesa de banquete con platos chinos, cestas de dim sum y té'),
        menus: [
          { title: 'Para 2 personas', price: '31,95', dishes: ['Ensalada china', 'Rollo de primavera (2)', 'Arroz frito con tres delicias', 'Cerdo agridulce o Tallarines fritos con ternera', 'Pollo con almendras'] },
          { title: 'Para 3 personas', price: '44,90', dishes: ['Rollo de primavera (3)', 'Ensalada especial china', 'Arroz frito con tres delicias', 'Pollo con almendras', 'Costillas asadas o Tallarines fritos con 3 delicias', 'Ternera con salsa de ostras'] },
          { title: 'Para 4 personas', price: '58,00', dishes: ['Ensalada de gambas o arroz frito con 3 delicias', 'Rollo de primavera (4)', 'Arroz frito con gambas', 'Tallarines fritos con gambas', 'Ternera con bambú y setas chinas', 'Bolitas de pollo fritas', 'Cerdo agridulce'] },
          { title: 'Para 5 personas', price: '73,50', dishes: ['Rollo de primavera (5)', 'Ensalada de gambas (2)', 'Arroz frito con gambas', 'Fideos de arroz salteados con tres delicias', 'Verduras con gambas', 'Ternera salteada con salsa picante', 'Tallarines fritos con pollo', 'Pato frito'] },
          { title: 'Para 6 personas', price: '81,95', dishes: ['Ensalada especial de la casa (2)', 'Rollo de primavera (6)', 'Arroz frito con gambas', 'Tallarines especiales a la plancha', 'Langostinos fritos rebozados', 'Ternera salteada con salsa picante estilo tailandés', 'Pollo frito con almendras estilo chino', 'Pato a la naranja', 'Familia feliz'] },
        ],
        includes: [
          ['Bebidas', 'Copa de vino, cerveza, agua, casera o refresco'],
          ['Postres', 'Helado, flan, fruta, café o té'],
        ],
      },
    ],
  },

  /* ───────────────────────── BEBIDAS ───────────────────────── */
  {
    id: 'bebidas',
    title: 'Bebidas',
    zh: '飲品',
    sections: [
      {
        id: 'vinos',
        type: 'drinks',
        title: 'Vinos',
        groups: [
          {
            title: 'Vino tinto · Rioja',
            columns: ['Botella', '1/4'],
            items: [
              { name: 'Cune (crianza)', prices: ['14,95', '8,50'] },
              { name: 'Marqués de Cáceres (crianza)', prices: ['15,95', '8,80'] },
              { name: 'Faustino VII', prices: ['10,95', null] },
            ],
          },
          {
            title: 'Otros vinos',
            columns: ['Botella', '1/4'],
            items: [
              { name: 'Vino de la casa', prices: ['5,95', null] },
              { name: 'Sangría', prices: ['7,95', '4,95'] },
            ],
          },
          { title: 'Vino rosado', columns: ['Botella', '1/4'], items: [{ name: 'Lambrusco (Italiano)', prices: ['7,95', null] }] },
          { title: 'Vino blanco', columns: ['Botella', '1/4'], items: [{ name: 'Vino de la casa', prices: ['7,95', null] }] },
        ],
      },
      {
        id: 'cervezas',
        type: 'drinks',
        title: 'Cervezas',
        groups: [
          {
            title: 'Cervezas',
            columns: ['Lata', 'Botella'],
            items: [
              { name: 'Cerveza Mahou', prices: ['1,95', '2,50'] },
              { name: 'Cerveza Mahou sin alcohol', prices: ['1,95', null] },
              { name: 'Cerveza Heineken', prices: ['1,95', null] },
              { name: 'Cerveza china', prices: [null, '2,50'] },
              { name: 'Cerveza japonesa', prices: [null, '2,60'] },
            ],
          },
        ],
      },
      {
        id: 'refrescos',
        type: 'drinks',
        title: 'Refrescos y Agua',
        groups: [
          {
            title: 'Refrescos y agua',
            columns: ['Botella o lata'],
            items: [
              { name: 'Coca Cola, Fanta, Tónica, Trina, Sprite, Aquarius, Nestea, Casera', prices: ['1,95'] },
              { name: 'Agua con o sin gas (1,5 L)', prices: ['2,30'] },
              { name: 'Agua con o sin gas (0,50 L)', prices: ['1,60'] },
            ],
          },
        ],
      },
      {
        id: 'licores',
        type: 'drinks',
        title: 'Licores Chinos',
        groups: [
          {
            title: 'Licores chinos',
            columns: ['Copa'],
            items: [
              { name: 'Kaoliang (Sake fuerte) 62', prices: ['3,15'] },
              { name: 'Mei Kui Lu (Licor de Rosa)', prices: ['3,15'] },
              { name: 'Kui Hua Chow (Licor de flor de canela)', prices: ['2,50'] },
              { name: 'Sake', prices: ['3,50'] },
            ],
          },
        ],
      },
    ],
  },
];

/** Flat list of every dish (sections with `items`), used for search. */
export const ALL_DISHES = MENU.flatMap((group) =>
  group.sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, groupId: group.id, sectionId: section.id, sectionTitle: section.title })),
  ),
);
