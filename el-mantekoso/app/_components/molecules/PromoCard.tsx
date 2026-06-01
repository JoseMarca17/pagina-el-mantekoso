"use client";

interface PromoCardProps {
  icon: string;
  title: string;
  desc: string;
  save: string;
  onClick?: () => void;
}

export default function PromoCard({ icon, title, desc, save, onClick }: PromoCardProps) {
  return (
    <div
      className="mx-4 mb-[10px] bg-white border border-(--color-border) rounded-[16px] p-[14px_16px] flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      <div className="w-[52px] h-[52px] bg-(--color-cream-2) rounded-[12px] flex items-center justify-center text-[32px] shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-bold text-(--color-navy) mb-[2px]">{title}</div>
        <div className="text-[11px] text-(--color-muted)">{desc}</div>
        <div className="text-[10px] font-bold text-(--color-stock-ok) mt-[3px]">{save}</div>
      </div>
      <button className="bg-(--color-navy) text-white text-[10px] font-bold px-3 py-[6px] rounded-[10px]">
        Usar
      </button>
    </div>
  );
}
