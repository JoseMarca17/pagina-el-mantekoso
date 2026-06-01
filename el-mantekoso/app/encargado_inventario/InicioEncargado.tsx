"use client";
import React from 'react';

interface InicioEncargadoProps {
  onNavigate: () => void;
}

export default function InicioEncargado({ onNavigate }: InicioEncargadoProps) {
  // Opciones del menú basadas en la imagen proporcionada
  const opciones = [
    { icon: "🛍️", label: "Historial de Pedidos" },
    { icon: "📍", label: "Mis Direcciones" },
    { icon: "💳", label: "Métodos de Pago" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F1] font-sans pb-28">
      
      {/* Barra de Estado (Notificaciones/Batería) */}
      <div className="flex justify-between items-center px-10 pt-8 pb-2 text-[12px] font-bold text-[#0f2042]">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Título de la Vista */}
      <h1 className="text-center font-serif text-[22px] font-black text-[#1D3557] mt-2 mb-8">Mi Perfil</h1>

      {/* Card de Usuario (Estilo de la imagen) */}
      <div className="mx-8 bg-white rounded-[45px] py-10 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#F1E9DF]">
        <div className="w-[110px] h-[110px] rounded-full border-2 border-[#E9C46A] flex items-center justify-center bg-[#FFF9F1] overflow-hidden mb-5">
          <span className="text-[50px]">👨‍💻</span>
        </div>
        <h2 className="font-display text-[20px] font-black text-[#1D3557]">Andrés Cruz</h2>
        <p className="text-[12px] text-[#94A3B8] font-semibold mt-1">andres.cruz@emi.edu.bo</p>
        
        <div className="mt-6 bg-[#FFFBEB] px-6 py-2.5 rounded-full border border-[#FEF3C7]">
          <span className="text-[11px] font-black text-[#D97706] tracking-tight">✨ 450 Puntos Mantekosos</span>
        </div>
      </div>

      {/* Listado de Opciones (Botones Blancos) */}
      <div className="mt-8 px-8 space-y-4">
        {opciones.map((item) => (
          <button
            key={item.label}
            className="w-full bg-white flex items-center justify-between px-6 py-[20px] rounded-[24px] shadow-sm border border-[#F1E9DF] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-5">
              <span className="text-[18px]">{item.icon}</span>
              <span className="text-[14px] font-bold text-[#1D3557]">{item.label}</span>
            </div>
            <span className="text-[#CBD5E1] text-[20px]">›</span>
          </button>
        ))}
      </div>

      {/* Área Personal Técnico (Caja Crema Inferior) */}
      <div className="mt-8 mx-8 p-7 bg-[#FFFAF3] rounded-[35px] border border-[#FDECD7] flex flex-col items-center shadow-sm">
        <span className="text-[10px] font-black text-[#A8B2C1] tracking-[0.2em] mb-4 uppercase">Área Personal Técnico</span>
        <button
          onClick={onNavigate}
          className="w-full bg-[#1D3557] text-white py-4.5 rounded-[22px] font-black text-[13px] flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:bg-[#152A47] transition-all"
        >
          <span>🔐</span> Modo Administrador
        </button>
      </div>

      {/* Tab Bar Navegación Inferior (Fijo) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#F1E9DF] px-10 py-5 flex justify-between items-center rounded-t-[40px] shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col items-center opacity-25">
          <span className="text-[22px]">🏠</span>
          <span className="text-[9px] font-black mt-1.5 uppercase">Inicio</span>
        </div>
        <div className="flex flex-col items-center opacity-25">
          <span className="text-[22px]">🍪</span>
          <span className="text-[9px] font-black mt-1.5 uppercase tracking-tighter">Vitrina</span>
        </div>
        <div className="flex flex-col items-center opacity-25">
          <span className="text-[22px]">❤️</span>
          <span className="text-[9px] font-black mt-1.5 uppercase tracking-tighter">Nosotros</span>
        </div>
        <div className="flex flex-col items-center text-[#1D3557]">
          <span className="text-[22px]">👤</span>
          <span className="text-[9px] font-black mt-1.5 uppercase tracking-tighter">Cuenta</span>
          <div className="w-1.5 h-1.5 bg-[#1D3557] rounded-full mt-1"></div>
        </div>
      </nav>

    </div>
  );
}