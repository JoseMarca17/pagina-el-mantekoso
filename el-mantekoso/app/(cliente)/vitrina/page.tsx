"use client";

import { useState } from "react";
import SearchBar from "@/app/_components/molecules/SearchBar";
import ProductGrid from "@/app/_components/organisms/ProductGrid";
import { useToast } from "@/app/_components/atoms/Toast";
import { products } from "@/app/_lib/data";

export default function VitrinaPage() {
  const [query, setQuery] = useState("");
  const toast = useToast();

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      <div className="px-6 pb-4">
        <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-[1px] pb-1">Menú del día</p>
        <h1 className="font-display text-[20px] font-bold text-(--color-navy)">Nuestra Vitrina Cremosa</h1>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <ProductGrid products={filtered} onToast={(m) => toast.show(m)} />

      <div className="h-4" />
    </div>
  );
}
