"use client";
import React, { useState } from 'react';
import { InventarioDB, Categoria } from './mockDb';

interface BuscadorProps {
  db: InventarioDB;
  onBack: () => void;
  onOperar: (productoId: number, tab: 'ingreso' | 'baja') => void;
}

export default function Buscador({ db, onBack, onOperar }: BuscadorProps) {
  const [categoriaActiva, setCategoriaActiva] = useState('Insumos');
  const [busqueda, setBusqueda] = useState('');
  const [soloAlertas, setSoloAlertas] = useState(false);

  // Lógica de filtrado funcional
  const resultados = db.productos.filter(item => {
    const coincideCategoria = item.categoria === categoriaActiva;
    const coincideBusqueda = item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             item.tag.toLowerCase().includes(busqueda.toLowerCase());
    const coincideAlerta = soloAlertas ? item.stock <= item.minStock : true;
    
    return coincideCategoria && coincideBusqueda && coincideAlerta;
  });

  const categorias = [
    { id: 'Insumos', icon: '📦' },
    { id: 'Tortas', icon: '🎂' },
    { id: 'Masitas', icon: '🥐' },
    { id: 'Bebidas', icon: '☕' }
  ];

  return (
    <div className="p-6 animate-fade-in bg-[#FFF9F1] min-h-screen pb-32">
      <header className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack} 
          className="w-10 h-10 bg-white rounded-full shadow-sm border border-[#F1E9DF] flex items-center justify-center active:scale-90 transition-transform font-bold"
        >
          ←
        </button>
        <div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Inventario Físico</span>
          <h2 className="text-[18px] font-black text-[#1D3557]">Buscador de Artículos</h2>
        </div>
      </header>

      {/* Input de Búsqueda Funcional */}
      <div className="bg-white p-4 rounded-[22px] border border-[#F1E9DF] flex items-center gap-3 shadow-sm mb-4">
        <span className="text-amber-500">🔍</span>
        <input 
          type="text" 
          placeholder="Buscar producto, lote o etiqueta..."
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 outline-none font-bold text-[#1D3557] text-sm placeholder:text-slate-300 placeholder:font-medium" 
        />
        {busqueda && (
          <button 
            onClick={() => setBusqueda('')} 
            className="text-slate-400 font-bold hover:text-slate-600 text-xs px-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtro Rápido Alertas */}
      <div className="flex justify-between items-center mb-6 px-2">
        <button
          onClick={() => setSoloAlertas(!soloAlertas)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-extrabold uppercase border transition-all ${
            soloAlertas 
              ? 'bg-red-50 text-red-600 border-red-200' 
              : 'bg-white text-slate-500 border-[#F1E9DF]'
          }`}
        >
          <span>⚠️</span> Solo Stock Crítico
        </button>
        <span className="text-[9px] font-extrabold text-[#1D3557] bg-white px-3 py-1 rounded-full border border-[#F1E9DF]">
          Ref: 2026-06-07
        </span>
      </div>

      {/* Selector de Categorías Funcional */}
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Categorías</p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
        {categorias.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`whitespace-nowrap px-5 py-3 rounded-full text-[11px] font-bold border transition-all flex items-center gap-2 ${
              categoriaActiva === cat.id 
                ? 'bg-[#1D3557] text-white border-[#1D3557] shadow-md shadow-blue-900/10' 
                : 'bg-white text-[#1D3557] border-[#F1E9DF] hover:bg-slate-50'
            }`}
          >
            <span>{cat.icon}</span> {cat.id}
          </button>
        ))}
      </div>

      {/* Resultados Dinámicos */}
      <div className="flex justify-between items-center mb-4 px-2">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Resultados</p>
        <span className="text-[10px] font-black text-[#1D3557] bg-white px-3 py-1 rounded-full border border-[#F1E9DF] shadow-sm">
          {resultados.length} {resultados.length === 1 ? 'ítem' : 'ítems'}
        </span>
      </div>

      {resultados.length > 0 ? (
        resultados.map(item => {
          const esAlerta = item.stock <= item.minStock;
          const porcentajeStock = Math.min(100, Math.max(0, (item.stock / (item.minStock * 1.5)) * 100));
          
          return (
            <div 
              key={item.id} 
              className="bg-white rounded-[35px] border border-[#F1E9DF] p-6 shadow-sm relative overflow-hidden mb-4 animate-fade-in flex flex-col"
            >
              {/* Alerta de Stock */}
              {esAlerta && (
                <div className="absolute top-0 right-0 bg-[#FDE2E2] text-[#E63946] text-[8px] font-black px-4 py-1.5 rounded-bl-[20px] uppercase tracking-wider border-l border-b border-[#FEE2E2]">
                  ⚠️ Crítico
                </div>
              )}
              
              <div className="flex items-start">
                <span className="bg-[#FEF3C7] text-[#D97706] text-[8px] font-black px-3 py-1 rounded-md uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>
              
              <h3 className="text-[16px] font-black text-[#1D3557] mt-3 mb-1 leading-snug">{item.nombre}</h3>
              <p className="text-[10px] text-slate-400 font-bold mb-4">Lote actual: {item.lote}</p>
              
              {/* Barra de progreso de stock */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-[10px] font-bold mb-1.5">
                  <span className="text-slate-500 uppercase">Progreso Stock:</span>
                  <span className={esAlerta ? 'text-[#E63946] font-black' : 'text-slate-600'}>
                    {item.stock} / {item.minStock} {item.unidad} (Mín)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      esAlerta ? 'bg-[#E63946]' : 'bg-[#10B981]'
                    }`}
                    style={{ width: `${porcentajeStock}%` }}
                  ></div>
                </div>
              </div>

              {/* Grid de detalles */}
              <div className="grid grid-cols-2 gap-y-4 border-t border-dashed border-slate-100 pt-4 mb-4 text-[11px]">
                <div>
                  <p className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wide">Cantidad Física</p>
                  <p className={`text-[12px] font-black mt-0.5 ${esAlerta ? 'text-[#E63946]' : 'text-[#10B981]'}`}>
                    {item.stock} {item.unidad}
                  </p>
                </div>
                <div>
                  <p className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wide">Vencimiento</p>
                  <p className="text-[12px] font-black text-[#1D3557] mt-0.5">
                    {item.vence}
                  </p>
                </div>
                <div>
                  <p className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wide">Ubicación Estante</p>
                  <p className="text-[12px] font-black text-slate-600 mt-0.5">{item.estante}</p>
                </div>
                <div>
                  <p className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wide">Último Movimiento</p>
                  <p className="text-[12px] font-black text-slate-500 mt-0.5 italic">{item.ingreso}</p>
                </div>
              </div>

              {/* Botones rápidos de Ajustes Relacionales */}
              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 mt-1">
                <button
                  onClick={() => onOperar(item.id, 'ingreso')}
                  className="bg-[#1D3557] text-white py-2.5 rounded-[16px] text-[10px] font-black flex items-center justify-center gap-1.5 shadow active:scale-95 transition-transform"
                >
                  📥 Ingreso
                </button>
                <button
                  onClick={() => onOperar(item.id, 'baja')}
                  className="bg-red-50 text-[#E63946] border border-red-100 py-2.5 rounded-[16px] text-[10px] font-black flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  ⚠️ Registrar Baja
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-20 bg-white rounded-[35px] border border-dashed border-slate-200">
          <span className="text-3xl">📭</span>
          <p className="text-slate-400 font-bold text-xs mt-3">No hay coincidencias en {categoriaActiva}</p>
          <p className="text-slate-300 text-[10px] font-semibold mt-1">Intenta con otra búsqueda o desmarca filtros</p>
        </div>
      )}
      {/* Spacer para evitar solapamiento con la barra de navegación */}
      <div className="h-32" />
    </div>
  );
}