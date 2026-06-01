"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface FavoriteRowProps {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  onAdd?: () => void;
}

export default function FavoriteRow({ id, name, desc, price, img, onAdd }: FavoriteRowProps) {
  const router = useRouter();
  return (
    <div
      className="flex gap-3 items-center p-[10px_16px] bg-white rounded-[16px] mx-4 mb-3 border border-(--color-border) cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => router.push(`/vitrina/${id}`)}
    >
      <Image
        src={img}
        alt={name}
        width={70}
        height={70}
        className="w-[70px] h-[70px] rounded-[12px] object-cover shrink-0"
      />
      <div className="flex-1">
        <div className="text-[13px] font-bold text-(--color-navy) mb-[3px]">{name}</div>
        <div className="text-[10px] text-(--color-muted) mb-[6px]">{desc}</div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-bold text-(--color-navy)">${price.toFixed(2)}</span>
          <button
            className="w-7 h-7 bg-(--color-navy) text-white rounded-full flex items-center justify-center text-lg font-light leading-none active:bg-(--color-gold)"
            onClick={(e) => { e.stopPropagation(); onAdd?.(); }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
