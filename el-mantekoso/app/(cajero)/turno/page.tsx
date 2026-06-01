"use client";

import { useRouter } from "next/navigation";


// Datos simulados (En producción vendrían de tu API o estado global)
const shiftData = {
  cashierInitials: "JP",
  cashierName: "Juan Pérez",
  role: "Cajero en turno",
  startTime: "08:00",
  endTime: "16:00",
  elapsedTime: "1h 45m",
  financials: {
    initialFund: 50.00,
    cashSales: 125.50,
    cardSales: 80.00,
  }
};

export default function CajeroTurnoPage() {
  const router = useRouter();

  const expectedCash = shiftData.financials.initialFund + shiftData.financials.cashSales;

  const handleCloseShift = () => {
    // Aquí iría la lógica para cerrar la caja en tu backend
    if (confirm("¿Estás seguro de que deseas cerrar la caja y finalizar el turno?")) {
      // toast?.show("Turno finalizado correctamente ✓");
      router.push("/login"); // O a donde corresponda tras cerrar el turno
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EE] flex flex-col justify-between relative font-sans">
      
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-bold text-[#3D2F20]/70 z-40">
        <span>9:45</span>
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-wifi text-[10px]"></i>
          <i className="fa-solid fa-battery-three-quarters text-xs"></i>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-28">
        
        {/* Header */}
        <header className="p-6 pt-2 bg-[#FFF9EE]/95 backdrop-blur-md z-30 flex items-center gap-4 sticky top-0">
          <div className="w-14 h-14 rounded-full bg-(--color-navy) flex items-center justify-center text-white text-xl border-4 border-[#FCEFD2] shadow-sm">
            {shiftData.cashierInitials}
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-(--color-navy)">
              {shiftData.cashierName}
            </h1>
            <p className="text-[10px] text-[#3D2F20]/60 font-bold uppercase tracking-wider">
              {shiftData.role}
            </p>
          </div>
        </header>

        {/* Info del Turno */}
        <section className="px-5 mb-6">
          <div className="bg-[#FCEFD2] rounded-[2rem] p-5 shadow-sm border border-(--color-gold)/20 flex flex-col gap-3">
            <div className="flex justify-between items-center pb-3 border-b border-(--color-gold)/20">
              <div className="flex items-center gap-2 text-(--color-navy)">
                <i className="fa-regular fa-clock"></i>
                <span className="text-xs font-bold">Turno Actual</span>
              </div>
              <span className="text-xs font-bold text-[#3D2F20]">
                {shiftData.startTime} - {shiftData.endTime}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#3D2F20]/80">Tiempo transcurrido</span>
              <span className="text-xs font-bold text-(--color-navy)">
                {shiftData.elapsedTime}
              </span>
            </div>
          </div>
        </section>

        {/* Resumen de Caja (Control de su turno) */}
        <section className="px-5">
          <h3 className="text-xs font-extrabold text-[#3D2F20]/60 uppercase tracking-wider mb-3">
            Resumen de Caja
          </h3>
          
          <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-[#FCEFD2] flex flex-col gap-4">
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#3D2F20]/70">Fondo Inicial (Apertura)</span>
              <span className="text-sm font-bold text-(--color-navy)">
                ${shiftData.financials.initialFund.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#3D2F20]/70">Ventas Efectivo</span>
              <span className="text-sm font-bold text-green-600">
                +${shiftData.financials.cashSales.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-[#3D2F20]/70">Ventas Tarjeta</span>
              <span className="text-sm font-bold text-(--color-gold)">
                +${shiftData.financials.cardSales.toFixed(2)}
              </span>
            </div>

            <div className="w-full h-px bg-[#FCEFD2] my-1"></div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#3D2F20]">Efectivo Esperado en Caja</span>
              <span className="text-xl font-serif font-bold text-(--color-navy)">
                ${expectedCash.toFixed(2)}
              </span>
            </div>

            <button 
              onClick={handleCloseShift}
              className="mt-4 w-full bg-red-50 text-red-600 border border-red-200 font-bold py-3.5 rounded-full hover:bg-red-600 hover:text-white transition-colors text-xs flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-lock"></i> Cerrar Caja y Finalizar Turno
            </button>
          </div>
        </section>
      </div>

      {/* NavBar Cajero (Activo en Turno) */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/90 backdrop-blur-md text-[#3D2F20]/70 py-3.5 px-6 rounded-full flex justify-between items-center shadow-xl shadow-[#3D2F20]/10 border border-[#FCEFD2] z-40">
        <button 
          onClick={() => router.push("/cajero")}
          className="flex flex-col items-center gap-0.5 hover:text-(--color-navy) transition-colors"
        >
          <i className="fa-solid fa-cash-register text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">POS</span>
        </button>
        <button 
          onClick={() => router.push("/catalogo")}
          className="flex flex-col items-center gap-0.5 hover:text-(--color-navy) transition-colors"
        >
          <i className="fa-solid fa-box text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">Stock</span>
        </button>
        <button 
          className="flex flex-col items-center gap-0.5 text-(--color-navy) relative"
        >
          <i className="fa-regular fa-clock text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">Turno</span>
          {/* Indicador de pestaña activa */}
          <div className="absolute -bottom-1.5 w-[5px] h-[5px] bg-(--color-navy) rounded-full"></div>
        </button>
      </nav>

      {/* Indicador de Home (Estilo iOS) */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-40"></div>
    </div>
  );
}