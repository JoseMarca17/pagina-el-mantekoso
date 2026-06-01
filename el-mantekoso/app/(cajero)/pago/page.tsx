"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PagoPage() {
  const router = useRouter();

  // Estados
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [receivedAmount, setReceivedAmount] = useState<number | string>(20.00);
  const [showModal, setShowModal] = useState(false);

  // Valores simulados (en producción vendrían de tu carrito)
  const totalAmount = 15.50;
  const change = typeof receivedAmount === 'number' ? Math.max(0, receivedAmount - totalAmount) : 0;

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleNewSale = () => {
    // Aquí podrías llamar a clearCart() de tu contexto
    setShowModal(false);
    router.push("/cajero"); // Ajusta la ruta a tu inicio del POS
  };

  return (
    <div className="min-h-screen bg-[#FFF9EE] flex flex-col justify-between relative font-sans">
      
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-bold text-[#3D2F20]/70 z-40">
        <span>9:43</span>
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-wifi text-[10px]"></i>
          <i className="fa-solid fa-battery-three-quarters text-xs"></i>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-10">
        
        {/* Header con botón de retorno */}
        <header className="p-6 pt-2 flex items-center gap-4 sticky top-0 bg-[#FFF9EE]/95 backdrop-blur-md z-30">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-white text-(--color-navy) rounded-full shadow-sm border border-[#FCEFD2] flex items-center justify-center hover:bg-[#FCEFD2] transition-colors"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h1 className="text-xl font-serif font-bold text-(--color-navy)">Procesar Cobro</h1>
        </header>

        {/* Monto a Cobrar */}
        <section className="px-5 mb-6 flex flex-col items-center justify-center">
          <p className="text-xs font-bold text-[#3D2F20]/60 uppercase tracking-widest mb-1">Monto Total</p>
          <h2 className="text-5xl font-serif font-extrabold text-(--color-navy)">
            ${totalAmount.toFixed(2)}
          </h2>
        </section>

        {/* Métodos de Pago */}
        <section className="px-5 mb-6">
          <h3 className="text-xs font-extrabold text-[#3D2F20]/60 uppercase tracking-wider mb-3">
            Método de Pago
          </h3>
          <div className="grid grid-cols-3 gap-3">
            
            {/* Opción Efectivo */}
            <div 
              onClick={() => setPaymentMethod("efectivo")}
              className={`rounded-2xl p-3 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors ${
                paymentMethod === "efectivo" 
                  ? "bg-(--color-navy) text-white border-2 border-(--color-navy) shadow-md" 
                  : "bg-white text-[#3D2F20] border border-[#FCEFD2] hover:border-(--color-gold)"
              }`}
            >
              <i className={`fa-solid fa-money-bill-wave text-xl ${paymentMethod === "efectivo" ? "text-(--color-gold)" : ""}`}></i>
              <span className="text-[10px] font-bold">Efectivo</span>
            </div>

            {/* Opción Tarjeta */}
            <div 
              onClick={() => setPaymentMethod("tarjeta")}
              className={`rounded-2xl p-3 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors ${
                paymentMethod === "tarjeta" 
                  ? "bg-(--color-navy) text-white border-2 border-(--color-navy) shadow-md" 
                  : "bg-white text-[#3D2F20] border border-[#FCEFD2] hover:border-(--color-gold)"
              }`}
            >
              <i className={`fa-regular fa-credit-card text-xl ${paymentMethod === "tarjeta" ? "text-(--color-gold)" : ""}`}></i>
              <span className="text-[10px] font-bold">Tarjeta</span>
            </div>

            {/* Opción QR / Transferencia */}
            <div 
              onClick={() => setPaymentMethod("qr")}
              className={`rounded-2xl p-3 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors ${
                paymentMethod === "qr" 
                  ? "bg-(--color-navy) text-white border-2 border-(--color-navy) shadow-md" 
                  : "bg-white text-[#3D2F20] border border-[#FCEFD2] hover:border-(--color-gold)"
              }`}
            >
              <i className={`fa-solid fa-qrcode text-xl ${paymentMethod === "qr" ? "text-(--color-gold)" : ""}`}></i>
              <span className="text-[10px] font-bold">Pago QR</span>
            </div>

          </div>
        </section>

        {/* Calculadora de Cambio (Solo visible si es efectivo) */}
        {paymentMethod === "efectivo" && (
          <section className="px-5 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-[#FCEFD2]">
              <label className="text-xs font-bold text-(--color-navy) block mb-2">Efectivo Recibido</label>
              <div className="relative w-full mb-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D2F20] font-bold">$</span>
                <input 
                  type="number" 
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value ? Number(e.target.value) : "")}
                  className="w-full bg-[#FFF9EE] border border-[#FCEFD2] rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-[#3D2F20] focus:outline-none focus:border-(--color-gold) shadow-inner"
                />
              </div>
              <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl border border-green-100">
                <span className="text-xs font-bold text-green-800">Cambio a entregar:</span>
                <span className="text-lg font-serif font-bold text-green-700">
                  ${change.toFixed(2)}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Botón de Confirmación */}
        <section className="px-5">
          <button 
            onClick={handleConfirm}
            className="w-full bg-(--color-gold) text-white font-bold py-4 rounded-full shadow-lg shadow-(--color-gold)/30 hover:bg-(--color-navy) transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <i className="fa-solid fa-check"></i> Confirmar Pago
          </button>
        </section>

      </div>

      {/* Indicador de Home */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-40"></div>

      {/* MODAL DE PAGO EXITOSO Y TICKET */}
      <div 
        className={`fixed inset-0 bg-[#1A335E]/90 backdrop-blur-sm z-[100] flex items-center justify-center p-5 transition-all duration-300 ${
          showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className={`w-full max-w-[300px] flex flex-col items-center transform transition-transform duration-500 ${
            showModal ? "translate-y-0" : "translate-y-10"
          }`}
        >
          {/* Icono de Éxito Flotante */}
          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-3xl shadow-xl shadow-green-400/40 mb-4 z-10">
            <i className="fa-solid fa-check"></i>
          </div>

          {/* Recibo / Ticket */}
          <div className="bg-white w-full rounded-t-xl pt-6 pb-4 px-6 relative flex flex-col items-center">
            <h3 className="font-serif font-bold text-(--color-navy) text-xl mb-1">El Mantekoso</h3>
            <p className="text-[9px] text-[#3D2F20]/60 font-mono mb-4">Ticket #004592</p>
            
            <div className="w-full border-t border-dashed border-slate-300 py-3">
              <div className="flex justify-between text-[10px] font-mono text-[#3D2F20] mb-1">
                <span>2x Cheesecake</span>
                <span>$13.00</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#3D2F20] mb-1">
                <span>1x Café Amer.</span>
                <span>$2.50</span>
              </div>
            </div>

            <div className="w-full border-t border-dashed border-slate-300 pt-3 flex justify-between items-end">
              <span className="text-xs font-bold text-(--color-navy)">TOTAL</span>
              <span className="text-lg font-serif font-bold text-(--color-navy)">$15.50</span>
            </div>
          </div>
          
          {/* Borde inferior en zigzag simulando corte de papel */}
          <div 
            className="w-full h-3 mb-6"
            style={{
              background: 'linear-gradient(135deg, transparent 5px, #FFFFFF 0) 0 0, linear-gradient(-135deg, transparent 5px, #FFFFFF 0) 0 0',
              backgroundColor: 'transparent',
              backgroundSize: '10px 10px',
              backgroundRepeat: 'repeat-x'
            }}
          ></div>

          {/* Botones de Acción Post-Venta */}
          <div className="flex gap-3 w-full">
            <button 
              onClick={() => window.print()} 
              className="flex-1 bg-white/20 text-white border border-white/40 font-bold py-3 rounded-xl text-[11px] hover:bg-white/30 transition-colors"
            >
              <i className="fa-solid fa-print mb-1 block text-sm"></i> Imprimir
            </button>
            <button 
              onClick={handleNewSale} 
              className="flex-1 bg-(--color-gold) text-white font-bold py-3 rounded-xl text-[11px] shadow-lg shadow-(--color-gold)/20 hover:bg-[#c28f51] transition-colors"
            >
              <i className="fa-solid fa-plus mb-1 block text-sm"></i> Nueva Venta
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}