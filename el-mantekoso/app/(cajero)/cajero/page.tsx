"use client";

import { useRouter } from "next/navigation";


// Datos de ejemplo basados en tu HTML (pueden venir de un estado o de useCart)
const currentSale = [
  { id: "cheesecake", name: "Cheesecake Arándanos", qty: 2, price: 13.00, icon: "🍰" },
  { id: "cafe-americano", name: "Café Americano", qty: 1, price: 2.50, icon: "☕" },
];

export default function CajeroPosPage() {
  const router = useRouter();


  return (
    <div className="min-h-screen bg-[#FFF9EE] flex flex-col justify-between relative font-sans">
      
      {/* Status Bar (Adaptada a tu diseño original) */}
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-bold text-(--color-navy) z-40">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-wifi text-[10px]"></i>
          <i className="fa-solid fa-battery-three-quarters text-xs"></i>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-28">
        
        {/* Header */}
        <header className="p-6 pt-2 flex justify-between items-center sticky top-0 bg-[#FFF9EE]/95 backdrop-blur-md z-30">
          <div>
            <h1 className="text-xl font-serif font-bold text-(--color-navy)">Caja Abierta</h1>
            <p className="text-[10px] text-[#3D2F20]/60 font-bold uppercase tracking-wider">
              Turno Mañana - Juan P.
            </p>
          </div>
          <button className="w-10 h-10 bg-white text-(--color-navy) rounded-xl shadow-sm border border-[#FCEFD2] flex items-center justify-center">
            <i className="fa-solid fa-barcode"></i>
          </button>
        </header>

        {/* Lista de Compra (Venta Actual) */}
        <section className="px-5 mb-6">
          <h3 className="text-xs font-extrabold text-[#3D2F20]/60 uppercase tracking-wider mb-3">
            Venta Actual
          </h3>
          
          <div className="flex flex-col gap-3">
            {currentSale.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-[#FCEFD2] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FCEFD2] rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-(--color-navy)">{item.name}</h4>
                    <p className="text-[10px] text-[#3D2F20]/60">{item.qty} {item.qty === 1 ? 'unidad' : 'unidades'}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-(--color-navy)">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
            
            {/* Botón para añadir más */}
            <button 
              onClick={() => router.push("/vitrina")}
              className="w-full py-3 border-2 border-dashed border-(--color-gold)/40 text-(--color-gold) text-xs font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FCEFD2]/50 transition-colors"
            >
              <i className="fa-solid fa-plus"></i> Añadir Producto
            </button>
          </div>
        </section>

        {/* Aplicar Descuento */}
        <section className="px-5 mb-6">
          <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-[#FCEFD2] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A335E]/10 text-(--color-navy) rounded-full flex items-center justify-center">
                <i className="fa-solid fa-tag"></i>
              </div>
              <div>
                <h4 className="text-xs font-bold text-(--color-navy)">Código de Descuento</h4>
                <p className="text-[10px] text-[#3D2F20]/60">Solo descuentos autorizados</p>
              </div>
            </div>
            <button 
              className="bg-[#FCEFD2] text-(--color-navy) text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-(--color-gold) hover:text-white transition-colors"
            >
              Aplicar
            </button>
          </div>
        </section>

        {/* Totales */}
        <section className="px-5">
          <div className="bg-(--color-navy) rounded-[2.5rem] p-6 text-white shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Subtotal</span>
              <span className="text-sm font-bold">$15.50</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
              <span className="text-xs text-white/70">Descuento</span>
              <span className="text-sm font-bold text-(--color-gold)">-$0.00</span>
            </div>
            <div className="flex justify-between items-end mb-6">
              <span className="text-sm font-bold">Total a Cobrar</span>
              <span className="text-3xl font-serif font-bold text-(--color-gold)">$15.50</span>
            </div>
            <button 
              onClick={() => router.push("/pago")}
              className="w-full bg-(--color-gold) text-white font-bold py-3.5 rounded-full shadow-lg hover:bg-white hover:text-(--color-navy) transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-money-bill-wave"></i> Procesar Pago
            </button>
          </div>
        </section>
      </div>

      {/* NavBar Cajero */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/90 backdrop-blur-md text-[#3D2F20]/70 py-3.5 px-6 rounded-full flex justify-between items-center shadow-xl shadow-[#3D2F20]/10 border border-[#FCEFD2] z-40">
        <button 
          className="flex flex-col items-center gap-0.5 text-(--color-navy) relative"
          // Utiliza una clase condicional en tu app real para aplicar el punto activo
        >
          <i className="fa-solid fa-cash-register text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">POS</span>
          <div className="absolute -bottom-1.5 w-[5px] h-[5px] bg-(--color-navy) rounded-full"></div>
        </button>
        <button 
          onClick={() => router.push("/catalogo")}
          className="flex flex-col items-center gap-0.5 hover:text-(--color-navy) transition-colors"
        >
          <i className="fa-solid fa-box text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">Stock</span>
        </button>
        <button 
          onClick={() => router.push("/turno")}
          className="flex flex-col items-center gap-0.5 hover:text-(--color-navy) transition-colors"
        >
          <i className="fa-regular fa-clock text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">Turno</span>
        </button>
      </nav>

      {/* Indicador de Home (Estilo iOS) */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-40"></div>
    </div>
  );
}