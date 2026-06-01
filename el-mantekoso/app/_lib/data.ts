import { Product } from "./types";

export const products: Product[] = [
  {
    id: "cheesecake",
    name: "Cheesecake Arándanos",
    desc: "Base de galleta mantecosa",
    fullDesc:
      "Nuestro cheesecake insignia preparado con una base de galleta de mantequilla avellanada y una capa generosa de mermelada rústica de arándanos silvestres. Sin conservantes, hecho cada mañana.",
    price: 6.5,
    oldPrice: 8.0,
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
    stock: "ok",
    stockCount: 6,
    badge: "Insignia",
  },
  {
    id: "mousse",
    name: "Torta Mousse Cacao",
    desc: "Cremoso e intenso chocolate al 70%",
    fullDesc:
      "Capas esponjosas de bizcocho húmedo de chocolate, rellenas de mousse cremoso artesanal con cacao orgánico al 70%. Sin gluten disponible.",
    price: 5.5,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    stock: "ok",
    stockCount: 12,
    badge: "Top 1",
  },
  {
    id: "lemon",
    name: "Lemon Pie Clásico",
    desc: "Merengue italiano y limón",
    fullDesc:
      "Merengue italiano con puntos de tostado perfecto sobre una base de crema de limón de Yungas. Textura aérea y sabor equilibrado.",
    price: 3.8,
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
    stock: "ok",
    stockCount: 8,
    badge: "Favorito",
  },
  {
    id: "macarons",
    name: "Macarons Cream",
    desc: "Caja de 6 unidades premium",
    fullDesc:
      "Selección premium de 6 macarons elaborados con harina de almendras y rellenos de ganache de chocolate blanco y crema pastelera.",
    price: 9.5,
    img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80",
    stock: "low",
    stockCount: 3,
    badge: "Edición Limitada",
  },
  {
    id: "cinnamon",
    name: "Cinnamon Rolls",
    desc: "Glaseado cremoso extra",
    fullDesc:
      "Rolls de canela glaseados con crema de queso extra. Horneados cada mañana. Actualmente agotados, disponibles mañana.",
    price: 2.9,
    img: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?auto=format&fit=crop&w=600&q=80",
    stock: "none",
    badge: "Artesanal",
  },
  {
    id: "croissant",
    name: "Croissant Mantequilla",
    desc: "24h de hojaldrado artesanal",
    fullDesc:
      "Hojaldre artesanal con 24 horas de fermentación lenta. Crujiente por fuera, suave y aireado por dentro. Elaborado con mantequilla de alta calidad.",
    price: 3.2,
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    stock: "ok",
    stockCount: 15,
    badge: "Clásico",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
