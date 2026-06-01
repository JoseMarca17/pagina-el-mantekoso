"use client";

import Image from "next/image";

interface CartItemProps {
  name: string;
  price: number;
  qty: number;
  img: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function CartItem({ name, price, qty, img, onIncrease, onDecrease }: CartItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-(--color-border)">
      <Image
        src={img}
        alt={name}
        width={52}
        height={52}
        className="w-[52px] h-[52px] rounded-[12px] object-cover shrink-0"
      />
      <div className="flex-1">
        <div className="text-[13px] font-bold text-(--color-navy)">{name}</div>
        <div className="text-[12px] text-(--color-muted)">${price.toFixed(2)} c/u</div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <button
            className="w-6 h-6 rounded-full border-[1.5px] border-(--color-border) bg-white text-[14px] text-(--color-navy) flex items-center justify-center"
            onClick={onDecrease}
          >
            −
          </button>
          <span className="text-[13px] font-bold text-(--color-navy)">{qty}</span>
          <button
            className="w-6 h-6 rounded-full bg-(--color-navy) text-white text-[14px] flex items-center justify-center"
            onClick={onIncrease}
          >
            +
          </button>
        </div>
        <span className="text-[13px] font-bold text-(--color-navy)">${(price * qty).toFixed(2)}</span>
      </div>
    </div>
  );
}
