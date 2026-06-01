"use client";

import Image from "next/image";

interface CategoryChipProps {
  label: string;
  img: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryChip({ label, img, active, onClick }: CategoryChipProps) {
  return (
    <div className="flex flex-col items-center gap-[6px] cursor-pointer shrink-0" onClick={onClick}>
      <div
        className={`w-14 h-14 rounded-[16px] flex items-center justify-center overflow-hidden border-[1.5px] transition-all ${
          active
            ? "bg-(--color-cream-2) border-(--color-gold) border-2"
            : "bg-white border-(--color-border)"
        }`}
      >
        <Image src={img} alt={label} width={36} height={36} className="w-9 h-9 object-cover rounded-lg" />
      </div>
      <span className={`text-[10px] font-medium ${active ? "text-(--color-navy) font-bold" : "text-(--color-muted)"}`}>
        {label}
      </span>
    </div>
  );
}
