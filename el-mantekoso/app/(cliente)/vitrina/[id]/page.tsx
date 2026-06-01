"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import Badge from "@/app/_components/atoms/Badge";
import StockLabel from "@/app/_components/atoms/StockLabel";
import Button from "@/app/_components/atoms/Button";
import FavoriteRow from "@/app/_components/molecules/FavoriteRow";
import { useCart } from "@/app/_lib/cart";
import { useToast } from "@/app/_components/atoms/Toast";
import { getProduct, products } from "@/app/_lib/data";

export default function DetalleProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = getProduct(id);
  if (!product) notFound();

  const { addItem } = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.id !== product.id).slice(0, 1);

  return (
    <div>
      <div className="relative">
        <Image src={product.img} alt={product.name} width={390} height={260} className="w-full h-[260px] object-cover" />
        <div className="absolute top-12 left-4 z-10">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-[20px] text-(--color-navy)">←</button>
        </div>
      </div>
      <div className="px-6 py-5">
        <Badge>{product.badge}</Badge>
        <h1 className="font-display text-[24px] font-bold text-(--color-navy) mt-2 mb-[6px]">{product.name}</h1>
        <StockLabel status={product.stock} count={product.stockCount} />
        <p className="text-[13px] text-(--color-muted) leading-relaxed mt-3 mb-4">{product.fullDesc}</p>
        <div className="flex justify-between items-center mb-5">
          <div>
            <span className="font-display text-[28px] font-bold text-(--color-navy)">${product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="text-[13px] line-through text-(--color-muted) ml-2">${product.oldPrice.toFixed(2)}</span>}
          </div>
          <div className="flex items-center gap-3 bg-(--color-cream-2) rounded-[20px] px-4 py-[6px]">
            <button className="text-[20px] text-(--color-navy) font-light leading-none cursor-pointer" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="text-[16px] font-bold text-(--color-navy) min-w-[20px] text-center">{qty}</span>
            <button className="text-[20px] text-(--color-navy) font-light leading-none cursor-pointer" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
        </div>
        <Button variant="primary" disabled={product.stock === "none"} onClick={() => {
          addItem({ productId: product.id, name: product.name, price: product.price, img: product.img }, qty);
          toast.show("Añadido al pedido ✓");
          router.push("/pedido");
        }}>
          {product.stock === "none" ? "Sin stock" : "Añadir al Pedido"}
        </Button>
        {related.length > 0 && (
          <>
            <div className="h-6" />
            <p className="text-[12px] font-bold text-(--color-navy) mb-2">También te puede gustar</p>
            {related.map((p) => (
              <FavoriteRow key={p.id} id={p.id} name={p.name} desc={p.desc} price={p.price} img={p.img}
                onAdd={() => { addItem({ productId: p.id, name: p.name, price: p.price, img: p.img }); toast.show("Añadido ✓"); }} />
            ))}
          </>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
}