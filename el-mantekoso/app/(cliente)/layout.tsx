import BottomNav from "@/app/_components/organisms/BottomNav";
import { CartProvider } from "@/app/_lib/cart";
import { ToastProvider } from "@/app/_components/atoms/Toast";

export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <div className="flex flex-col min-h-screen max-w-[390px] mx-auto bg-(--color-cream) relative overflow-hidden">
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
          <BottomNav />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}
