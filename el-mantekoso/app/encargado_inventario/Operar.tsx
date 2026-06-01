"use client";
import React, { useState } from 'react';

interface OperarProps {
  onBack: () => void;
}

export default function Operar({ onBack }: OperarProps) {
  const [tab, setTab] = useState<'ingreso' | 'baja'>('ingreso');
  const [cargando, setCargando] = useState(false);

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setTimeout(() => setCargando(false), 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F1] animate-fade-in pb-32">
      
      {/* Header con Botón de Retroceso Circular */}
      <header className="px-6 pt-10 pb-4 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1D3557] border border-[#F1E9DF] active:scale-95 transition-transform"
        >
          <span className="text-xl">←</span>
        </button>
        <div>
          <span className="text-[10px] font-black text-[#E9C46A] uppercase tracking-widest">
            {tab === 'ingreso' ? 'Transacciones Manuales' : 'Transacciones'}
          </span>
          <h1 className="text-[20px] font-black text-[#1D3557] font-display">Registro y Ajustes</h1>
        </div>
      </header>

      {/* Selector de Pestañas Estilo Figma */}
      <div className="mx-6 mt-4 bg-white p-1.5 rounded-[22px] flex border border-[#F1E9DF] shadow-sm">
        <button 
          onClick={() => setTab('ingreso')}
          className={`flex-1 py-3 rounded-[18px] text-[12px] font-bold transition-all flex items-center justify-center gap-2 ${
            tab === 'ingreso' ? 'bg-[#1D3557] text-white shadow-md' : 'text-[#94A3B8]'
          }`}
        >
          🚢 Ingreso / Alta
        </button>
        <button 
          onClick={() => setTab('baja')}
          className={`flex-1 py-3 rounded-[18px] text-[12px] font-bold transition-all flex items-center justify-center gap-2 ${
            tab === 'baja' ? 'bg-[#E63946] text-white shadow-md' : 'text-[#94A3B8]'
          }`}
        >
          ⚠️ Registrar Baja
        </button>
      </div>

      {/* Contenedor del Formulario */}
      <div className="mx-6 mt-8 bg-white rounded-[40px] p-8 border border-[#F1E9DF] shadow-sm">
        
        {/* Etiqueta de la Sección (HU) */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-lg">{tab === 'ingreso' ? '🤝' : '🥫'}</span>
          <h3 className="text-[9px] font-black text-[#E9C46A] uppercase tracking-[0.15em]">
            {tab === 'ingreso' 
              ? 'Formulario de Abastecimiento (HU1, HU9)' 
              : 'Salida por Mermas o Roturas (HU6)'}
          </h3>
        </div>

        <form className="space-y-6" onSubmit={handleAction}>
          
          {/* Campo: Nombre del Producto */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#94A3B8] ml-2">
              {tab === 'ingreso' ? 'Nombre del Producto / Insumo' : 'Seleccionar Ítems Dañado/Vencido'}
            </label>
            <input 
              type="text" 
              defaultValue={tab === 'ingreso' ? "Mantequilla de Campo Pura" : "Torta de Tres Leches Cremosa"}
              className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-bold text-[#1D3557] outline-none"
            />
          </div>

          {/* Fila: Categoría y Cantidad */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94A3B8] ml-2">
                {tab === 'ingreso' ? 'Categoría (HU7)' : 'Cantidad Física'}
              </label>
              <input 
                type="text" 
                defaultValue={tab === 'ingreso' ? "Insumos" : "4 Unidades"}
                className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-bold text-[#1D3557] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94A3B8] ml-2">
                {tab === 'ingreso' ? 'Cantidad Ingresada' : 'Motivo Técnico'}
              </label>
              <input 
                type="text" 
                defaultValue={tab === 'ingreso' ? "25 Kg" : "Vencido en Vitrina"}
                className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-bold text-[#1D3557] outline-none"
              />
            </div>
          </div>

          {/* Campo: Fecha (Solo Ingreso) */}
          {tab === 'ingreso' && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94A3B8] ml-2">Fecha de Vencimiento (HU1/HU9)</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="05 / 28 / 2026" 
                  className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-bold text-[#1D3557] outline-none"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2">📅</span>
              </div>
            </div>
          )}

          {/* Botón de Acción Principal */}
          <button 
            type="submit"
            className={`w-full py-5 rounded-[24px] font-black text-[13px] mt-4 transition-all active:scale-[0.98] shadow-lg ${
              tab === 'ingreso' 
                ? 'bg-[#1D3557] text-white shadow-blue-900/20' 
                : 'bg-[#E63946] text-white shadow-red-900/20'
            }`}
          >
            {cargando ? "Procesando..." : (
              tab === 'ingreso' ? "Guardar Entrada en Almacén" : "Declarar Descarte y Ajustar Kárdex"
            )}
          </button>

        </form>
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-10 font-bold px-12 leading-relaxed italic">
        "Sistema de trazabilidad automatizado para el cumplimiento de normativas de salubridad e inventario."
      </p>
    </div>
  );
}