"use client";
import React, { useState } from 'react';

// Base de datos estática para la maqueta funcional
const INVENTARIO_COMPLETO = [
  { 
    id: 1, 
    nombre: "Mantequilla de Campo Pura", 
    categoria: "Insumos", 
    tag: "INSUMO BASE", 
    alerta: true, 
    stock: "18 Kg", 
    vence: "28 / 05 / 2026", 
    estante: "Sector Fríos A-3", 
    ingreso: "15/05 (50 Kg)" 
  },
  { 
    id: 2, 
    nombre: "Torta Tres Leches", 
    categoria: "Tortas", 
    tag: "REPOSTERÍA", 
    alerta: false, 
    stock: "5 Unidades", 
    vence: "03 / 06 / 2026", 
    estante: "Vitrina Frontal", 
    ingreso: "01/06 (10 Uds)" 
  },
  { 
    id: 3, 
    nombre: "Cuñapé Abizcochado", 
    categoria: "Masitas", 
    tag: "PROD. LOCAL", 
    alerta: true, 
    stock: "12 Bolsas", 
    vence: "15 / 07 / 2026", 
    estante: "Pasillo Central", 
    ingreso: "20/05 (100 Uds)" 
  },
  { 
    id: 4, 
    nombre: "Coca Cola 500ml", 
    categoria: "Bebidas", 
    tag: "BEBIDA FRÍA", 
    alerta: false, 
    stock: "45 Unidades", 
    vence: "10 / 12 / 2026", 
    estante: "Frigobar 2", 
    ingreso: "28/05 (100 Uds)" 
  }
];

export default function Buscador({ onBack }: { onBack: () => void }) {
  const [categoriaActiva, setCategoriaActiva] = useState('Insumos');
  const [busqueda, setBusqueda] = useState('Mantequilla');

  // Lógica de filtrado funcional
  const resultados = INVENTARIO_COMPLETO.filter(item => 
    item.categoria === categoriaActiva && 
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const categorias = [
    { id: 'Tortas', icon: '🎂' },
    { id: 'Masitas', icon: '🥐' },
    { id: 'Bebidas', icon: '☕' },
    { id: 'Insumos', icon: '📦' }
  ];

  return (
    <div className="p-6 animate-fade-in bg-[#FFF9F1] min-h-screen pb-32">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm border border-[#F1E9DF] flex items-center justify-center active:scale-90 transition-transform">←</button>
        <h2 className="text-[18px] font-black text-[#1D3557]">Buscador & Filtros (HU8)</h2>
      </header>

      {/* Input de Búsqueda Funcional */}
      <div className="bg-white p-4 rounded-[22px] border border-[#F1E9DF] flex items-center gap-3 shadow-sm mb-6">
        <span className="text-amber-500">🔍</span>
        <input 
          type="text" 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 outline-none font-bold text-[#1D3557] text-sm" 
        />
        <span className="text-slate-300">|</span>
        <span className="text-navy-900">☩</span>
      </div>

      {/* Selector de Categorías Funcional (HU7) */}
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Filtrar por Categoría (HU7)</p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
        {categorias.map(cat => (
          <button 
            key={cat.id}
            onClick={() => {
                setCategoriaActiva(cat.id);
                if (busqueda === 'Mantequilla') setBusqueda(''); // Limpia para ver otros resultados
            }}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[11px] font-bold border transition-all flex items-center gap-2 ${
                categoriaActiva === cat.id ? 'bg-[#1D3557] text-white border-[#1D3557]' : 'bg-white text-[#1D3557] border-[#F1E9DF]'
            }`}
          >
            <span>{cat.icon}</span> {cat.id}
          </button>
        ))}
      </div>

      {/* Resultados Dinámicos */}
      <div className="flex justify-between items-center mb-4 px-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resultados</p>
        <span className="text-[10px] font-black text-[#1D3557]">{resultados.length} Ítem Encontrado</span>
      </div>

      {resultados.length > 0 ? resultados.map(item => (
        <div key={item.id} className="bg-white rounded-[35px] border border-[#F1E9DF] p-6 shadow-sm relative overflow-hidden mb-4 animate-fade-in">
          {item.alerta && (
            <div className="absolute top-0 right-0 bg-[#FDE2E2] text-[#E63946] text-[8px] font-black px-4 py-1.5 rounded-bl-[20px] uppercase">Stock Alerta</div>
          )}
          <span className="bg-[#FEF3C7] text-[#D97706] text-[8px] font-black px-3 py-1 rounded-md uppercase">{item.tag}</span>
          <h3 className="text-[16px] font-black text-[#1D3557] mt-3 mb-4">{item.nombre}</h3>
          
          <div className="grid grid-cols-2 gap-y-5 border-t border-dashed border-slate-100 pt-4">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Cantidad Actual</p>
              <p className={`text-[12px] font-black ${item.alerta ? 'text-[#E63946]' : 'text-green-600'}`}>{item.stock} en Almacén</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Vencimiento (HU1)</p>
              <p className="text-[12px] font-black text-[#1D3557]">{item.vence}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Ubicación Estante</p>
              <p className="text-[12px] font-black text-slate-500">{item.estante}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Último Ingreso (HU9)</p>
              <p className="text-[12px] font-black text-slate-500 font-medium">{item.ingreso}</p>
            </div>
          </div>
        </div>
      )) : (
        <div className="text-center py-20 bg-white rounded-[35px] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-sm">No hay coincidencias en {categoriaActiva}</p>
        </div>
      )}
    </div>
  );
}