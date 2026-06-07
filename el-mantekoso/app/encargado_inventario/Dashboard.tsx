"use client";
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Operar from './Operar';
import Buscador from './Buscador';
import { InventarioDB, KardexRegistro } from './mockDb';

interface DashboardProps {
  db: InventarioDB;
  initialSubVista?: 'home' | 'buscador' | 'operar' | 'kardex';
  onBack: () => void;
  onIngreso: (productoId: number, cantidad: number, lote: string, vence: string) => void;
  onBaja: (productoId: number, cantidad: number, motivo: string) => void;
}

export default function DashboardEncargado({
  db,
  initialSubVista = 'home',
  onBack,
  onIngreso,
  onBaja
}: DashboardProps) {
  const [subVista, setSubVista] = useState<'home' | 'buscador' | 'operar' | 'kardex'>('home');
  const [selectedProductoId, setSelectedProductoId] = useState<number | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<'ingreso' | 'baja'>('ingreso');
  const [kardexFiltro, setKardexFiltro] = useState<'todos' | 'entradas' | 'salidas'>('todos');

  // Actualizar la sub-vista activa si cambia desde el exterior (Deep Linking)
  useEffect(() => {
    setSubVista(initialSubVista);
  }, [initialSubVista]);

  // Auxiliar para días de vencimiento respecto al 2026-06-07 (fecha simulada)
  const getDaysToExpiration = (dateStr: string) => {
    const today = new Date('2026-06-07T00:00:00');
    const expireDate = new Date(dateStr + 'T00:00:00');
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Cálculos dinámicos
  const totalProductos = db.productos.length;
  const lowStockItems = db.productos.filter(p => p.stock <= p.minStock);
  const alertasStockCount = lowStockItems.length;

  const expiringItems = db.productos
    .map(p => ({ ...p, daysLeft: getDaysToExpiration(p.vence) }))
    .filter(p => p.daysLeft <= 7) // Vence en 7 días o ya venció
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const valorTotalInventario = db.productos.reduce((sum, p) => sum + (p.stock * p.costoUnitario), 0);

  // Registro de transacciones de hoy (simulado '2026-06-07' o calendario real)
  const systemToday = new Date().toISOString().split('T')[0];
  const totalIngresosHoy = db.kardex
    .filter(k => (k.fecha === '2026-06-07' || k.fecha === systemToday) && k.tipo === 'Entrada')
    .reduce((sum, k) => sum + k.cantidad, 0);

  const totalBajasHoy = db.kardex
    .filter(k => (k.fecha === '2026-06-07' || k.fecha === systemToday) && k.tipo === 'Ajuste')
    .reduce((sum, k) => sum + Math.abs(k.cantidad), 0);

  const todayMovements = db.kardex.filter(k => k.fecha === '2026-06-07' || k.fecha === systemToday);

  // Filtrado de Kárdex
  const kardexFiltrado = db.kardex.filter(item => {
    if (kardexFiltro === 'entradas') return item.tipo === 'Entrada';
    if (kardexFiltro === 'salidas') return item.tipo === 'Salida' || item.tipo === 'Ajuste';
    return true;
  });

  const renderContenido = () => {
    switch (subVista) {
      case 'operar':
        return (
          <Operar
            db={db}
            preselectedId={selectedProductoId}
            preselectedTab={selectedTab}
            onBack={() => {
              setSubVista('home');
              setSelectedProductoId(undefined);
            }}
            onIngreso={(prodId, cant, lote, vence) => {
              onIngreso(prodId, cant, lote, vence);
              setTimeout(() => {
                setSubVista('kardex');
              }, 1800);
            }}
            onBaja={(prodId, cant, mot) => {
              onBaja(prodId, cant, mot);
              setTimeout(() => {
                setSubVista('kardex');
              }, 1800);
            }}
          />
        );
      case 'buscador':
        return (
          <Buscador
            db={db}
            onBack={() => setSubVista('home')}
            onOperar={(prodId, tab) => {
              setSelectedProductoId(prodId);
              setSelectedTab(tab);
              setSubVista('operar');
            }}
          />
        );
      case 'kardex':
        return (
          <div className="p-6 animate-fade-in pb-32">
            <header className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSubVista('home')}
                className="w-10 h-10 bg-white rounded-full shadow-sm border border-[#F1E9DF] flex items-center justify-center font-black active:scale-95 transition-transform"
              >
                ←
              </button>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Historial Completo</span>
                <h2 className="font-black text-[#1D3557] text-[18px]">Kárdex de Trazabilidad</h2>
              </div>
            </header>

            {/* Filtros de Kárdex */}
            <div className="bg-white p-1 rounded-full border border-[#F1E9DF] flex mb-6 shadow-sm">
              {(['todos', 'entradas', 'salidas'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setKardexFiltro(f)}
                  className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${kardexFiltro === f ? 'bg-[#1D3557] text-white' : 'text-slate-400'
                    }`}
                >
                  {f === 'todos' ? 'Todos' : f === 'entradas' ? '📥 Entradas' : '📤 Bajas'}
                </button>
              ))}
            </div>

            {/* Listado del Kárdex */}
            <div className="space-y-3">
              {kardexFiltrado.length > 0 ? (
                kardexFiltrado.map((m) => (
                  <div key={m.id} className="bg-white p-4 rounded-[22px] border border-[#F1E9DF] flex flex-col gap-2 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-1.5 w-12" style={{
                      backgroundColor: m.tipo === 'Entrada' ? '#10B981' : m.tipo === 'Salida' ? '#EF4444' : '#F59E0B'
                    }}></div>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${m.tipo === 'Entrada' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                          }`}>
                          {m.tipo}
                        </span>
                        <h4 className="text-[13px] font-black text-[#1D3557] mt-1">{m.productoNombre}</h4>
                      </div>
                      <span className={`font-black text-sm ${m.tipo === 'Entrada' ? 'text-green-600' : 'text-red-500'
                        }`}>
                        {m.tipo === 'Entrada' ? `+${m.cantidad}` : `${m.cantidad}`} {m.unidad}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-slate-100 pt-2 flex flex-col gap-1">
                      <p className="text-[10px] text-slate-500 font-bold">
                        <span className="text-slate-400">Motivo:</span> {m.motivo}
                      </p>
                      <div className="flex justify-between text-[9px] text-slate-400 font-semibold mt-1">
                        <span>Lote: {m.lote}</span>
                        <span>{m.fecha === '2026-06-07' || m.fecha === systemToday ? `Hoy ${m.hora}` : `${m.fecha} ${m.hora}`}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-semibold text-right italic">
                        Resp: {m.responsable}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-[22px] border border-dashed border-slate-200">
                  <p className="text-slate-400 text-xs font-bold">No hay transacciones registradas</p>
                </div>
              )}
            </div>
            {/* Spacer para evitar solapamiento con el navbar flotante */}
            <div className="h-32" />
          </div>
        );
      default:
        return (
          <main className="dash-content animate-fade-in pb-32">

            {/* Resumen Financiero & de Items */}
            <section className="section-block bg-white p-5 rounded-[35px] border border-[#F1E9DF] shadow-sm mb-6">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valoración de Existencias</span>
              <h2 className="text-[#1D3557] text-[24px] font-black mt-1">
                Bs. {valorTotalInventario.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-dashed border-slate-100">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Items Registrados</p>
                  <p className="text-[14px] font-black text-[#1D3557]">{totalProductos} productos</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Estado Crítico</p>
                  <p className={`text-[14px] font-black ${alertasStockCount > 0 ? 'text-[#E63946]' : 'text-green-600'}`}>
                    {alertasStockCount > 0 ? `${alertasStockCount} alertas` : 'Sin alertas'}
                  </p>
                </div>
              </div>
            </section>

            {/* Alertas Stock */}
            <section className="section-block mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#E63946] text-[10px] font-black tracking-widest">⚠️ STOCK CRÍTICO / REORDENAR</h3>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full ${alertasStockCount > 0 ? 'bg-red-50 text-[#E63946]' : 'bg-green-50 text-green-600'
                  }`}>
                  {alertasStockCount} Ítems
                </span>
              </div>

              {alertasStockCount > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {lowStockItems.map((prod) => (
                    <div
                      key={prod.id}
                      className="min-w-[210px] bg-white p-5 rounded-[28px] border-l-[6px] border-[#E63946] shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <p className="text-[13px] font-black text-[#1D3557] line-clamp-1">{prod.nombre}</p>
                          <span className="text-[8px] bg-red-50 text-red-600 border border-red-100 px-1.5 py-0.5 rounded font-black uppercase shrink-0">Bajo</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mb-3">Estante: {prod.estante}</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center border-t border-dashed border-slate-100 pt-3 mt-1">
                          <div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">Actual / Mín</p>
                            <p className="text-[#E63946] font-black text-[12px]">{prod.stock} / {prod.minStock} {prod.unidad}</p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedProductoId(prod.id);
                              setSelectedTab('ingreso');
                              setSubVista('operar');
                            }}
                            className="bg-[#1D3557] text-white p-2 rounded-full text-[11px] font-black shadow active:scale-90 transition-transform"
                            title="Reabastecer"
                          >
                            📥
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-[30px] border border-dashed border-green-200 text-center">
                  <span className="text-2xl">🎉</span>
                  <p className="text-green-600 font-bold text-xs mt-1">¡Perfecto! Todo el inventario se encuentra por encima del mínimo.</p>
                </div>
              )}
            </section>

            {/* Vencimientos */}
            <section className="section-block mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#D97706] text-[10px] font-black tracking-widest">⏳ CONTROL DE VENCIMIENTO</h3>
                <span className="bg-[#FEF3C7] text-[#D97706] text-[9px] font-black px-3 py-1 rounded-full">Próximos 7 días</span>
              </div>

              <div className="bg-white rounded-[30px] p-2 shadow-sm border border-[#F1E9DF]">
                {expiringItems.length > 0 ? (
                  expiringItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center p-4 ${idx < expiringItems.length - 1 ? 'border-b border-dashed border-slate-100' : ''
                        }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-[12px] font-black text-[#1D3557]">{item.nombre}</p>
                          {item.daysLeft <= 0 && (
                            <span className="bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase">Vencido</span>
                          )}
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold mt-0.5">
                          Lote: {item.lote} • Stock: {item.stock} {item.unidad}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-full ${item.daysLeft <= 0
                            ? 'bg-red-100 text-red-700 font-black'
                            : item.daysLeft === 1
                              ? 'bg-amber-100 text-amber-700 font-black animate-pulse'
                              : 'bg-[#FEF3C7] text-[#D97706]'
                          }`}>
                          {item.daysLeft <= 0
                            ? 'Vencido'
                            : item.daysLeft === 1
                              ? 'Vence mañana'
                              : `Vence en ${item.daysLeft} días`
                          }
                        </span>

                        <button
                          onClick={() => {
                            setSelectedProductoId(item.id);
                            setSelectedTab('baja');
                            setSubVista('operar');
                          }}
                          className="bg-red-50 text-red-500 w-8 h-8 rounded-full border border-red-100 flex items-center justify-center text-xs active:scale-90 transition-transform font-bold"
                          title="Dar de baja por vencimiento"
                        >
                          ⚠️
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center">
                    <span className="text-xl">🍏</span>
                    <p className="text-slate-400 text-xs font-bold mt-1">No hay insumos por vencer esta semana.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Actividad y Movimientos de Hoy - Tabla Resumen */}
            <section className="section-block">
              <h3 className="text-slate-400 text-[10px] font-black tracking-widest mb-3">📊 ACTIVIDAD Y MOVIMIENTOS DE HOY</h3>
              <div className="bg-white rounded-[30px] p-5 shadow-sm border border-[#F1E9DF] overflow-hidden">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-dashed border-slate-100">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Resumen del Día</span>
                    <div className="flex gap-3 mt-0.5 text-[11px] font-black">
                      <span className="text-green-600">📥 +{totalIngresosHoy} Uds.</span>
                      <span className="text-red-500">⚠️ -{totalBajasHoy} Uds.</span>
                    </div>
                  </div>
                  <span className="text-[9px] bg-[#FEF3C7] text-[#D97706] px-2 py-1 rounded-md font-extrabold uppercase">Ref: 2026-06-07</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">
                        <th className="pb-2 font-black">Hora</th>
                        <th className="pb-2 font-black">Producto</th>
                        <th className="pb-2 font-black text-center">Tipo</th>
                        <th className="pb-2 font-black text-right">Cant.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {todayMovements.length > 0 ? (
                        todayMovements.map((mov) => (
                          <tr key={mov.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 text-slate-400 font-bold">{mov.hora}</td>
                            <td className="py-2.5 text-[#1D3557] font-black truncate max-w-[110px]">{mov.productoNombre}</td>
                            <td className="py-2.5 text-center">
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                                mov.tipo === 'Entrada' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                              }`}>
                                {mov.tipo === 'Entrada' ? 'Alt' : 'Baj'}
                              </span>
                            </td>
                            <td className={`py-2.5 text-right font-black ${
                              mov.tipo === 'Entrada' ? 'text-green-600' : 'text-red-500'
                            }`}>
                              {mov.tipo === 'Entrada' ? `+${mov.cantidad}` : `${mov.cantidad}`}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-slate-400 font-bold italic">
                            Sin transacciones registradas hoy
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Spacer para evitar solapamiento con el navbar flotante */}
            <div className="h-32" />
          </main>
        );
    }
  };

  return (
    <div className="dashboard-container bg-[#FFF9F1] min-h-screen">
      {subVista === 'home' && (
        <header className="bg-[#1D3557] pt-12 pb-10 px-8 rounded-b-[50px] relative shadow-lg">
          <button
            onClick={onBack}
            className="absolute left-6 top-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/10 font-black active:scale-95 transition-transform"
          >
            ←
          </button>
          <div className="mt-4">
            <span className="bg-[#E9C46A]/20 text-[#E9C46A] text-[9px] font-black px-3 py-1 rounded-full tracking-widest">
              SISCON ALMACÉN
            </span>
            <h1 className="text-white text-[24px] font-black mt-2 font-display">
              Administración de Stock
            </h1>
            <p className="text-white/50 text-[11px] font-semibold mt-0.5">
              Trazabilidad, Lotes e Inventario Relacional
            </p>
          </div>
          <div className="absolute right-8 top-12 w-10 h-10 rounded-full border-2 border-[#E9C46A]/30 flex items-center justify-center bg-white/10 text-lg">
            🏢
          </div>
        </header>
      )}

      {renderContenido()}

      {/* Navegación Inferior Móvil Fija */}
      <nav className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-[28px] p-2 flex justify-between border border-[#F1E9DF] shadow-xl z-50">
        {[
          { id: 'home', l: 'Panel', i: '📊' },
          { id: 'buscador', l: 'Buscador', i: '🔍' },
          { id: 'operar', l: '+ Operar', i: '➕' },
          { id: 'kardex', l: 'Kárdex', i: '🕒' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              setSubVista(item.id as any);
              setSelectedProductoId(undefined);
            }}
            className={`flex-1 py-3 rounded-[22px] flex flex-col items-center gap-1 transition-all ${subVista === item.id ? 'bg-[#FEF3C7] text-[#D97706] font-black scale-105' : 'text-[#1D3557] opacity-70'
              }`}
          >
            <span className="text-lg leading-none">{item.i}</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">{item.l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}