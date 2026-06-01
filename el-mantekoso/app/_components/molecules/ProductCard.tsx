"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import StockLabel from "../atoms/StockLabel";
import { StockStatus } from "@/app/_lib/types";

interface ProductCardProps {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  stock: StockStatus;
  stockCount?: number;
  onAdd?: () => void;
}

export default function ProductCard({
  id,
  name,
  desc,
  price,
  img,
  stock,
  stockCount,
  onAdd,
}: ProductCardProps) {
  const router = useRouter();
  const disabled = stock === "none";

  return (
    <div
      className="bg-white border border-(--color-border) rounded-[20px] overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
      onClick={() => router.push(`/vitrina/${id}`)}
    >
      <Image
        src={img}
        alt={name}
        width={200}
        height={130}
        className="w-full h-[130px] object-cover"
      />
      <div className="px-3 pt-2 pb-3">
        <StockLabel status={stock} count={stockCount} />
        <div className="text-[12px] font-bold text-(--color-navy) mt-[2px] mb-[2px]">{name}</div>
        <div className="text-[10px] text-(--color-muted) mb-2 leading-snug">{desc}</div>
        <div className="flex justify-between items-center">
          <span className={`text-[14px] font-bold ${disabled ? "text-(--color-muted)" : "text-(--color-navy)"}`}>
            ${price.toFixed(2)}
          </span>
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-light text-white transition-colors leading-none"
            style={{ background: disabled ? "var(--color-muted)" : "var(--color-navy)" }}
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.();
            }}
          >
            {disabled ? "−" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
