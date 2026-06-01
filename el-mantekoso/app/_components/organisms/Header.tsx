"use client";

import Link from "next/link";

interface HeaderProps {
  onSearchClick?: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  return (
    <div className="px-6 py-2 flex justify-between items-center">
      <div className="flex items-center gap-[10px]">
        <div className="w-9 h-9 bg-(--color-navy) rounded-[10px] flex items-center justify-center text-[20px]">
          🧁
        </div>
        <div>
          <div className="text-[9px] text-(--color-muted) uppercase tracking-[1px]">Artesanal</div>
          <div className="font-display text-[18px] font-bold text-(--color-navy) leading-tight">El Mantekoso</div>
        </div>
      </div>
      <button
        onClick={onSearchClick}
        className="w-9 h-9 rounded-full bg-white border border-(--color-border) flex items-center justify-center text-[16px] cursor-pointer"
      >
        🔍
      </button>
    </div>
  );
}
