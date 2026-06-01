interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
}

export default function OrderSummary({ subtotal, discount, total }: OrderSummaryProps) {
  return (
    <div className="mx-4 mb-3 bg-white border border-(--color-border) rounded-[16px] px-4 py-[14px]">
      <div className="flex justify-between text-[12px] text-(--color-muted) mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-[12px] text-(--color-muted) mb-2">
        <span>Descuento promo</span>
        <span className="text-(--color-stock-ok)">-${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-[15px] font-bold text-(--color-navy) border-t border-(--color-border) pt-[10px] mt-1">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
