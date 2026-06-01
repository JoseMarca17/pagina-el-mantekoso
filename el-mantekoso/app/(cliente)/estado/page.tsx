"use client";

import { useRouter } from "next/navigation";
import Timeline from "@/app/_components/organisms/Timeline";
import { useCart } from "@/app/_lib/cart";

export default function EstadoPage() {
  const router = useRouter();
  const { total } = useCart();

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      <div className="px-6 pb-4">
        <button className="flex items-center gap-[6px]" onClick={() => router.back()}>
          <span className="text-[20px] text-(--color-navy)">←</span>
          <span className="text-[14px] font-semibold text-(--color-navy)">Estado del Pedido</span>
        </button>
      </div>

      {/* Resumen */}
      <div className="mx-4 mb-5 bg-(--color-navy) rounded-[20px] px-5 py-4">
        <p className="text-[10px] text-white/60 uppercase tracking-[1px] mb-1">Pedido #MNT-2847</p>
        <p className="font-display text-[22px] font-bold text-white">3 productos · ${total.toFixed(2)}</p>
        <div className="flex gap-6 mt-3">
          <div>
            <p className="text-[10px] text-white/50">Tiempo estimado</p>
            <p className="text-[13px] font-bold text-white">~15 min</p>
          </div>
          <div>
            <p className="text-[10px] text-white/50">Estado</p>
            <p className="text-[13px] font-bold text-(--color-gold-2)">En preparación</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <p className="text-[9px] font-bold text-(--color-muted) uppercase tracking-[1px] px-6 mb-3">
        Seguimiento en tiempo real
      </p>
      <Timeline />

      {/* Punto de recojo */}
      <div className="mx-4 mt-4 bg-(--color-cream-2) rounded-[14px] px-4 py-3">
        <p className="text-[11px] font-bold text-(--color-navy) mb-[4px]">Punto de recojo</p>
        <p className="text-[12px] text-(--color-gold)">El Mantekoso — Calle de los Dulces #123, El Alto</p>
        <p className="text-[11px] text-(--color-muted)">Lun–Sáb 8:00 AM – 8:00 PM</p>
      </div>

      {/* Acciones */}
      <div className="flex gap-3 px-4 mt-4 pb-6">
        {[
          { icon: "📞", label: "Llamar" },
          { icon: "💬", label: "WhatsApp" },
          { icon: "🧾", label: "Comprobante" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            onClick={() => label === "Comprobante" && router.push("/ticket")}
            className="flex-1 flex flex-col items-center gap-[6px] bg-white border border-(--color-border) rounded-[14px] py-[10px] text-[22px]"
          >
            <span>{icon}</span>
            <span className="text-[10px] font-semibold text-(--color-navy)">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
