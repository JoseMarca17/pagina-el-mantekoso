"use client";

import PromoCard from "@/app/_components/molecules/PromoCard";
import { useToast } from "@/app/_components/atoms/Toast";

const promos = [
  {
    icon: "🎂",
    title: "Cumpleaños Dulce",
    desc: "Descuento del 15% en tu pedido de cumpleaños",
    save: "Ahorra hasta $8.00",
    code: "CUMPLE15",
  },
  {
    icon: "☀️",
    title: "Martes de Macarons",
    desc: "2x1 en macarons todos los martes",
    save: "Ahorra $9.50",
    code: "MARTES2X1",
  },
  {
    icon: "🎁",
    title: "Primera compra",
    desc: "10% de descuento en tu primer pedido",
    save: "Aplicado automáticamente",
    code: "AUTO",
  },
  {
    icon: "🥐",
    title: "Desayuno Artesanal",
    desc: "Croissant + bebida por $4.50",
    save: "Ahorra $2.00",
    code: "DESAYUNO",
  },
  {
    icon: "💌",
    title: "Trae un amigo",
    desc: "Ambos reciben $3 de crédito",
    save: "$3.00 de crédito",
    code: "AMIGOS",
  },
];

export default function PromosPage() {
  const toast = useToast();
  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      <div className="px-6 pb-5">
        <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-[1px] pb-1">Ofertas exclusivas</p>
        <h1 className="font-display text-[22px] font-bold text-(--color-navy)">Promociones del Mes</h1>
      </div>

      {/* Banner */}
      <div className="mx-4 mb-5 bg-(--color-navy) rounded-[20px] px-5 py-5 flex items-center gap-4">
        <div className="text-[48px]">🍰</div>
        <div>
          <p className="text-[11px] text-white/60 uppercase tracking-[1px]">Promo del día</p>
          <p className="font-display text-[18px] font-bold text-white leading-tight">
            10% off en toda la vitrina
          </p>
          <p className="text-[11px] text-(--color-gold-2) mt-1">Válido hoy hasta las 8pm</p>
        </div>
      </div>

      {promos.map((p) => (
        <PromoCard
          key={p.code}
          icon={p.icon}
          title={p.title}
          desc={p.desc}
          save={p.save}
          onClick={() => toast.show(`Promo "${p.title}" activada ✓`)}
        />
      ))}
      <div className="h-6" />
    </div>
  );
}
