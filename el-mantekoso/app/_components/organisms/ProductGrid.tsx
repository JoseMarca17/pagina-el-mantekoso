"use client";

import ProductCard from "../molecules/ProductCard";
import { Product } from "@/app/_lib/types";
import { useCart } from "@/app/_lib/cart";

interface ProductGridProps {
  products: Product[];
  onToast?: (msg: string) => void;
}

export default function ProductGrid({ products, onToast }: ProductGridProps) {
  const { addItem } = useCart();

  return (
    <div className="grid grid-cols-2 gap-3 px-4 pb-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          desc={p.desc}
          price={p.price}
          img={p.img}
          stock={p.stock}
          stockCount={p.stockCount}
          onAdd={() => {
            if (p.stock === "none") {
              onToast?.("Producto sin stock");
              return;
            }
            addItem({ productId: p.id, name: p.name, price: p.price, img: p.img });
            onToast?.("Añadido al pedido ✓");
          }}
        />
      ))}
    </div>
  );
}
