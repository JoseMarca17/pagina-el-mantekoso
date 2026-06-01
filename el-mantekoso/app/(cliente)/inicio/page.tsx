"use client";

import { useRouter } from "next/navigation";
import Header from "@/app/_components/organisms/Header";
import HeroBanner from "@/app/_components/organisms/HeroBanner";
import CategoryChip from "@/app/_components/molecules/CategoryChip";
import FavoriteRow from "@/app/_components/molecules/FavoriteRow";
import { useCart } from "@/app/_lib/cart";
import { useToast } from "@/app/_components/atoms/Toast";
import { products } from "@/app/_lib/data";

const categories = [
  { label: "Pasteles", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=80&q=80" },
  { label: "Masas", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=80&q=80" },
  { label: "Bebidas", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=80&q=80" },
  { label: "Galletas", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=80&q=80" },
];

const hero = products.find((p) => p.id === "cheesecake")!;
const favorites = products.filter((p) => ["croissant", "mousse"].includes(p.id));

export default function InicioPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const toast = useToast();

  return (
    <div>
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      <Header onSearchClick={() => router.push("/vitrina")} />

      <HeroBanner
        productId={hero.id}
        img={hero.img}
        badge={hero.badge}
        title="Cheesecake de Arándanos"
        desc="Textura suave con base mantecosa pura."
        price={hero.price}
        oldPrice={hero.oldPrice}
      />

      {/* Categories */}
      <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-[1px] px-6 pb-2">
        ¿Qué se te antoja hoy?
      </p>
      <div className="flex gap-[10px] px-4 pb-5 overflow-x-auto scrollbar-none">
        {categories.map((cat, i) => (
          <CategoryChip
            key={cat.label}
            label={cat.label}
            img={cat.img}
            active={i === 0}
            onClick={() => router.push("/vitrina")}
          />
        ))}
      </div>

      {/* Favoritos */}
      <div className="flex justify-between items-center px-6 pb-3">
        <h2 className="font-display text-[20px] font-bold text-(--color-navy)">Favoritos del Mes</h2>
        <button className="text-[12px] text-(--color-gold) font-semibold" onClick={() => router.push("/vitrina")}>
          Ver más
        </button>
      </div>

      {favorites.map((p) => (
        <FavoriteRow
          key={p.id}
          id={p.id}
          name={p.name}
          desc={p.desc}
          price={p.price}
          img={p.img}
          onAdd={() => {
            addItem({ productId: p.id, name: p.name, price: p.price, img: p.img });
            toast.show("Añadido al pedido ✓");
          }}
        />
      ))}
      <div className="h-4" />
    </div>
  );
}
