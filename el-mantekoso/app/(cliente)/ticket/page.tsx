"use client";

import { useRouter } from "next/navigation";
import Ticket from "@/app/_components/organisms/Ticket";
import Button from "@/app/_components/atoms/Button";
import { useCart } from "@/app/_lib/cart";
import { useToast } from "@/app/_components/atoms/Toast";

export default function TicketPage() {
  const router = useRouter();
  const { cart, total } = useCart();
  const toast = useToast();

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      <div className="px-6 pb-4">
        <button className="flex items-center gap-[6px]" onClick={() => router.back()}>
          <span className="text-[20px] text-(--color-navy)">←</span>
          <span className="text-[14px] font-semibold text-(--color-navy)">Comprobante</span>
        </button>
      </div>

      <Ticket items={cart} total={total} orderNum="#MNT-2847" />

      {/* Status */}
      <div className="mx-4 mb-4 bg-[#E8F5EE] rounded-[12px] px-4 py-3 flex items-center gap-[10px]">
        <div className="w-[10px] h-[10px] rounded-full bg-(--color-stock-ok) shrink-0" />
        <div>
          <div className="text-[12px] font-semibold text-(--color-stock-ok)">Pedido confirmado</div>
          <div className="text-[10px] text-(--color-muted)">Lunes 25/05 · 9:42 AM · Recojo en tienda</div>
        </div>
      </div>

      <div className="px-4 pb-2">
        <Button variant="primary" onClick={() => router.push("/estado")}>
          Ver estado del pedido →
        </Button>
      </div>
      <div className="px-4 pb-6">
        <Button variant="secondary" onClick={() => toast.show("Ticket guardado")}>
          Guardar comprobante
        </Button>
      </div>
    </div>
  );
}
