import { CartItem } from "@/app/_lib/types";

interface TicketProps {
  items: CartItem[];
  total: number;
  orderNum: string;
}

export default function Ticket({ items, total, orderNum }: TicketProps) {
  return (
    <>
      <div className="mx-4 mb-0 bg-white rounded-[20px] border border-(--color-border) overflow-hidden">
        <div className="bg-(--color-navy) px-5 py-5 text-center">
          <div className="font-display text-[20px] text-white font-bold">El Mantekoso</div>
          <div className="text-[10px] text-white/60 uppercase tracking-[1px] mt-[2px]">
            Pastelería Artesanal · La Paz
          </div>
          <div className="text-[28px] font-bold text-(--color-gold-2) mt-2 font-sans">{orderNum}</div>
        </div>
        <div className="px-5 py-4">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center py-2 border-b border-dashed border-(--color-border) last:border-0">
              <div>
                <div className="text-[12px] text-(--color-navy)">{item.name}</div>
                <div className="text-[11px] text-(--color-muted)">x{item.qty}</div>
              </div>
              <div className="text-[12px] font-bold text-(--color-navy)">
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-4 mt-0 mb-4 bg-(--color-cream-2) rounded-[12px] px-4 py-3 flex justify-between items-center">
        <div>
          <div className="text-[13px] text-(--color-muted)">Total a pagar</div>
          <div className="text-[10px] text-(--color-muted)">Promo 10% aplicado</div>
        </div>
        <div className="font-display text-[20px] font-bold text-(--color-navy)">${total.toFixed(2)}</div>
      </div>
    </>
  );
}
