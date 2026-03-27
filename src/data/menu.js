export const MENU = [
  {
    id: 1,
    cat: "pizza",
    emoji: "🍕",
    name: "Margherita DOP",
    desc: "San Marzano · Fior di latte · Basilico",
    price: 12.5,
    ingredients: ["Tomate San Marzano", "Mozzarella fior di latte", "Basilic frais", "Huile d'olive EV", "Pâte (Gluten)"]
  },
  {
    id: 2,
    cat: "pizza",
    emoji: "🍕",
    name: "Diavola",
    desc: "Tomate · Salami calabrais · Poivrons",
    price: 14.0,
    ingredients: ["Tomate San Marzano", "Mozzarella", "Salami calabrais", "Poivrons", "Pâte (Gluten)"]
  },
  {
    id: 3,
    cat: "pizza",
    emoji: "🍕",
    name: "Quattro Stagioni",
    desc: "Jambon · Champignons · Artichauts · Olives",
    price: 15.5,
    ingredients: ["Tomate", "Mozzarella", "Jambon cuit", "Champignons", "Artichauts", "Olives", "Pâte (Gluten)"]
  },
  {
    id: 4,
    cat: "pizza",
    emoji: "🍕",
    name: "Nduja & Stracciatella",
    desc: "Nduja · Stracciatella crémeuse · Roquette",
    price: 17.5,
    ingredients: ["Tomate", "Nduja calabraise", "Stracciatella", "Roquette", "Citron", "Pâte (Gluten)"]
  },
  {
    id: 5,
    cat: "pasta",
    emoji: "🍝",
    name: "Spaghetti Carbonara",
    desc: "Guanciale · Pecorino Romano DOP · Œuf",
    price: 13.0,
    ingredients: ["Spaghetti (Gluten)", "Guanciale", "Pecorino romano", "Œuf fermier", "Poivre noir"]
  },
  {
    id: 6,
    cat: "pasta",
    emoji: "🍝",
    name: "Penne Arrabbiata",
    desc: "Tomate piquante · Ail · Piment calabrais",
    price: 11.0,
    ingredients: ["Penne (Gluten)", "Tomate", "Ail", "Piment", "Persil", "Huile d'olive"]
  },
  {
    id: 7,
    cat: "pasta",
    emoji: "🍝",
    name: "Lasagne al Forno",
    desc: "Bœuf & Porc · Béchamel · Parmesan 24 mois",
    price: 14.5,
    ingredients: ["Pâte fraîche (Gluten)", "Bœuf", "Porc", "Béchamel (Lactose)", "Parmesan", "Tomate"]
  },
  {
    id: 8,
    cat: "gastro",
    emoji: "🍗",
    name: "Rosticceria siciliana",
    desc: "Arancini · Panelle · Crocché",
    price: 16.0,
    ingredients: ["Arancini (Gluten, Œuf)", "Panelle (Gluten)", "Crocché (Gluten, Œuf)", "Sauce tomate"]
  },
  {
    id: 9,
    cat: "gastro",
    emoji: "🥩",
    name: "Plateau Charcuterie",
    desc: "Salumi & Formaggi DOP · Pain artisanal",
    price: 22.0,
    ingredients: ["Bresaola", "Prosciutto", "Pecorino", "Parmigiano", "Pain (Gluten)", "Olives"]
  },
  {
    id: 10,
    cat: "dessert",
    emoji: "🍮",
    name: "Cannolo Siciliano",
    desc: "Ricotta · Citron confit · Pistaches Bronte",
    price: 6.5,
    ingredients: ["Coque (Gluten)", "Ricotta (Lactose)", "Citron confit", "Pistaches", "Sucre"]
  },
  {
    id: 11,
    cat: "dessert",
    emoji: "🍰",
    name: "Tiramisù Maison",
    desc: "Mascarpone · Espresso · Savoiardi",
    price: 7.0,
    ingredients: ["Mascarpone (Lactose)", "Savoiardi (Gluten)", "Café espresso", "Œuf", "Cacao amer"]
  },
  {
    id: 12,
    cat: "boisson",
    emoji: "🍷",
    name: "Vin rouge (verre)",
    desc: "Sélection sud de l'Italie",
    price: 5.5,
    ingredients: ["Vin rouge"]
  },
  {
    id: 13,
    cat: "boisson",
    emoji: "🍺",
    name: "Birra Moretti",
    desc: "33cl — Bière italienne",
    price: 4.0,
    ingredients: ["Bière (Gluten)"]
  },
  {
    id: 14,
    cat: "boisson",
    emoji: "☕",
    name: "Caffè Espresso",
    desc: "100% arabica — Napoli style",
    price: 2.5,
    ingredients: ["Café"]
  },
]

export const CATEGORIES = [
  { k: "all", l: "Tutto", i: "🍽️" },
  { k: "pizza", l: "Pizza", i: "🍕" },
  { k: "pasta", l: "Pasta", i: "🍝" },
  { k: "gastro", l: "Gastro", i: "🍗" },
  { k: "dessert", l: "Dolci", i: "🍮" },
  { k: "boisson", l: "Boire", i: "🍷" }
]

export const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
]

export const BUSY_SLOTS = ["13:00", "19:00", "20:00"]
