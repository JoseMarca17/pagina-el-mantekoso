"use client";

import { useRouter } from "next/navigation";
import CartItem from "@/app/_components/molecules/CartItem";
import OrderSummary from "@/app/_components/organisms/OrderSummary";
import Button from "@/app/_components/atoms/Button";
import { useCart } from "@/app/_lib/cart";

export default function PedidoPage() {
  const router = useRouter();
  const { cart, changeQty, subtotal, discount, total, count } = useCart();

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      <div className="px-6 pb-4 flex justify-between items-center">
        <button className="flex items-center gap-[6px]" onClick={() => router.back()}>
          <span className="text-[20px] text-(--color-navy)">←</span>
          <span className="text-[14px] font-semibold text-(--color-navy)">Mi Pedido</span>
        </button>
        <span className="text-[12px] text-(--color-muted)">{count} producto{count !== 1 ? "s" : ""}</span>
      </div>

      {/* Cart items */}
      {cart.length === 0 ? (
        <div className="text-center px-6 py-8 text-(--color-muted) text-[13px]">
          No hay productos en tu pedido.{" "}
          <button className="text-(--color-navy) font-bold" onClick={() => router.push("/vitrina")}>
            Ir a la vitrina →
          </button>
        </div>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.productId}
            name={item.name}
            price={item.price}
            qty={item.qty}
            img={item.img}
            onIncrease={() => changeQty(item.productId, 1)}
            onDecrease={() => changeQty(item.productId, -1)}
          />
        ))
      )}

      {/* Nota especial */}
      <div className="mx-4 my-3 bg-(--color-cream-2) rounded-[14px] px-4 py-3">
        <p className="text-[11px] font-bold text-(--color-navy) mb-[6px]">Nota especial</p>
        <textarea
          placeholder="Ej: sin gluten, sin maní, decoración especial..."
          className="w-full bg-transparent border-none outline-none text-[12px] text-(--color-navy) font-sans resize-none h-12 placeholder:text-(--color-muted)"
        />
      </div>

      <OrderSummary subtotal={subtotal} discount={discount} total={total} />

      <div className="px-4 pb-2">
        <Button
          variant="primary"
          disabled={cart.length === 0}
          onClick={() => router.push("/ticket")}
        >
          Confirmar Pedido →
        </Button>
      </div>
      <div className="px-4 pb-4">
        <Button variant="secondary" onClick={() => router.push("/vitrina")}>
          Seguir comprando
        </Button>
      </div>
      <div className="h-4" />
    </div>
  );
}
