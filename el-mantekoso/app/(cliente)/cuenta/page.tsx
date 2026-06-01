"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/atoms/Toast";

const menuItems = [
  { icon: "🛍", label: "Mis pedidos", href: "/pedido" },
  { icon: "🎟", label: "Mis promociones", href: "/promos" },
  { icon: "⭐", label: "Mis reseñas", href: "/resenas" },
  { icon: "📍", label: "Direcciones guardadas", href: null },
  { icon: "🔔", label: "Notificaciones", href: null },
  { icon: "🔒", label: "Seguridad", href: null },
];

export default function CuentaPage() {
  const router = useRouter();
  const toast = useToast();

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      {/* Perfil header */}
      <div className="bg-(--color-navy) px-6 pt-4 pb-8 flex items-center gap-4 mb-[-20px]">
        <div className="w-[60px] h-[60px] bg-(--color-cream-2) rounded-full flex items-center justify-center text-[28px] font-bold text-(--color-navy) shrink-0">
          FM
        </div>
        <div>
          <h1 className="font-display text-[20px] font-bold text-white">Fabricio M.</h1>
          <p className="text-[12px] text-white/60">fabricio@mail.com</p>
        </div>
        <button
          className="ml-auto text-[11px] font-semibold text-(--color-gold-2) bg-white/10 px-3 py-[5px] rounded-[10px]"
          onClick={() => toast.show("Editar perfil próximamente")}
        >
          Editar
        </button>
      </div>

      {/* Stats */}
      <div className="mx-4 bg-white border border-(--color-border) rounded-[18px] mt-[20px] px-5 py-4 mb-4 flex divide-x divide-(--color-border)">
        {[
          { n: "12", label: "Pedidos" },
          { n: "3", label: "Promos" },
          { n: "4.9", label: "Rating" },
        ].map(({ n, label }) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <span className="font-display text-[22px] font-bold text-(--color-navy)">{n}</span>
            <span className="text-[10px] text-(--color-muted)">{label}</span>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mx-4 bg-white border border-(--color-border) rounded-[18px] overflow-hidden mb-4">
        {menuItems.map(({ icon, label, href }, i) => (
          <button
            key={label}
            className={`flex items-center gap-3 w-full px-5 py-[13px] text-left transition-colors active:bg-(--color-cream-2) ${
              i !== 0 ? "border-t border-(--color-border)" : ""
            }`}
            onClick={() => href ? router.push(href) : toast.show(`${label} próximamente`)}
          >
            <span className="text-[20px]">{icon}</span>
            <span className="text-[13px] font-semibold text-(--color-navy) flex-1">{label}</span>
            <span className="text-(--color-muted) text-[16px]">›</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mb-6">
        <button
          className="w-full py-[13px] border border-(--color-border) rounded-[14px] text-[13px] font-bold text-(--color-stock-no)"
          onClick={() => { toast.show("Sesión cerrada"); setTimeout(() => router.push("/registro"), 800); }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
