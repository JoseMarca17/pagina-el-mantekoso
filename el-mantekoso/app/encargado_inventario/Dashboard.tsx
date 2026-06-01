"use client";
import React, { useState } from 'react';
import './Dashboard.css';
import Operar from './Operar';
import Buscador from './Buscador';

export default function DashboardEncargado({ onBack }: { onBack: () => void }) {
  const [subVista, setSubVista] = useState<'home' | 'buscador' | 'operar' | 'kardex'>('home');

  const renderContenido = () => {
    switch (subVista) {
      case 'operar': return <Operar onBack={() => setSubVista('home')} />;
      case 'buscador': return <Buscador onBack={() => setSubVista('home')} />;
      case 'kardex':
        return (
          <div className="p-6 animate-fade-in">
            <header className="flex items-center gap-4 mb-6">
               <button onClick={() => setSubVista('home')} className="w-10 h-10 bg-white rounded-full shadow-sm border border-[#F1E9DF]">←</button>
               <h2 className="font-black text-[#1D3557]">Kárdex de Trazabilidad</h2>
            </header>
            <div className="space-y-3">
                {[
                  {t: 'Entrada', i: 'Harina 000', c: '+50 Kg', h: '08:30'},
                  {t: 'Salida', i: 'Azúcar Gran.', c: '-10 Kg', h: '09:15'},
                  {t: 'Ajuste', i: 'Crema PIL', c: '-2 Lts', h: '10:45'}
                ].map((m, i) => (
                    <div key={i} className="bg-white p-4 rounded-[22px] border border-[#F1E9DF] flex justify-between items-center shadow-sm">
                        <div>
                            <p className="text-[11px] font-black text-[#1D3557]">{m.t} Manual (HU1)</p>
                            <p className="text-[10px] text-slate-400 font-medium">{m.i} • Hoy {m.h}</p>
                        </div>
                        <span className={`font-black text-xs ${m.t === 'Entrada' ? 'text-green-600' : 'text-red-500'}`}>{m.c}</span>
                    </div>
                ))}
            </div>
          </div>
        );
      default:
        return (
          <main className="dash-content animate-fade-in">
            {/* Alertas Stock (HU2) */}
            <section className="section-block">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#E63946] text-[10px] font-black tracking-widest">⚠️ ALERTAS DE STOCK CRÍTICO (HU2)</h3>
                <span className="bg-red-50 text-[#E63946] text-[9px] font-black px-3 py-1 rounded-full">2 Ítems</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                <div className="min-w-[200px] bg-white p-5 rounded-[28px] border-l-[6px] border-[#E63946] shadow-sm">
                  <p className="text-[13px] font-black text-[#1D3557]">Mantequilla de Campo</p>
                  <p className="text-[10px] text-slate-400 font-bold mb-3">Categoría: Insumos</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E63946] font-black text-[12px]">Quedan: 18 Kg</span>
                    <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-md font-bold text-slate-500">Mín: 30Kg</span>
                  </div>
                </div>
                <div className="min-w-[200px] bg-white p-5 rounded-[28px] border-l-[6px] border-[#E63946] shadow-sm">
                  <p className="text-[13px] font-black text-[#1D3557]">Coca Cola 500ml</p>
                  <p className="text-[10px] text-slate-400 font-bold mb-3">Categoría: Bebidas</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E63946] font-black text-[12px]">Quedan: 5 Uds</span>
                    <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-md font-bold text-slate-500">Mín: 24</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Vencimientos (HU4) */}
            <section className="section-block">
              <h3 className="text-[#D97706] text-[10px] font-black tracking-widest mb-3">⏳ PRÓXIMOS A VENCER (HU4)</h3>
              <div className="bg-white rounded-[30px] p-2 shadow-sm border border-[#F1E9DF]">
                <div className="flex justify-between items-center p-4 border-b border-dashed border-slate-100">
                  <div>
                    <p className="text-[12px] font-black text-[#1D3557]">Crema de Leche PIL</p>
                    <p className="text-[9px] text-slate-400 font-bold">Lote: #C-204 • Cantidad: 12 Lts</p>
                  </div>
                  <span className="bg-[#FEF3C7] text-[#D97706] text-[9px] font-black px-3 py-1.5 rounded-full">Vence en 2 días</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <p className="text-[12px] font-black text-[#1D3557]">Mermelada Frutos Rojos</p>
                    <p className="text-[9px] text-slate-400 font-bold">Lote: #M-911 • Cantidad: 6 Kg</p>
                  </div>
                  <span className="bg-[#FEF3C7] text-[#D97706] text-[9px] font-black px-3 py-1.5 rounded-full">Vence en 4 days</span>
                </div>
              </div>
            </section>

            {/* Sincronización (HU3) */}
            <section className="section-block">
              <h3 className="text-slate-400 text-[10px] font-black tracking-widest mb-3">📊 SINCRONIZACIÓN AUTOMÁTICA (HU3)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-[28px] text-center border border-[#F1E9DF]">
                  <span className="text-2xl mb-2 block">📥</span>
                  <p className="text-[11px] font-black text-[#1D3557]">Ingresos Hoy</p>
                  <p className="text-[10px] font-black text-green-500">+145 Unidades</p>
                </div>
                <div className="bg-white p-5 rounded-[28px] text-center border border-[#F1E9DF]">
                  <span className="text-2xl mb-2 block">🤖</span>
                  <p className="text-[11px] font-black text-[#1D3557]">Ventas Automáticas</p>
                  <p className="text-[10px] font-black text-blue-500">-89 Descuentos</p>
                </div>
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="dashboard-container bg-[#FFF9F1] min-h-screen">
      {subVista === 'home' && (
        <header className="bg-[#1D3557] pt-12 pb-10 px-8 rounded-b-[50px] relative shadow-lg">
          <button onClick={onBack} className="absolute left-6 top-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/10">←</button>
          <div className="mt-4">
            <span className="bg-[#E9C46A]/20 text-[#E9C46A] text-[9px] font-black px-3 py-1 rounded-full tracking-widest">SISCON ALMACÉN</span>
            <h1 className="text-white text-[26px] font-black mt-2 font-display">Jefe de Inventario</h1>
            <p className="text-white/50 text-[12px] font-medium">Control de Existencias & Trazabilidad</p>
          </div>
          <div className="absolute right-8 top-12 w-10 h-10 bg-white rounded-full border-2 border-[#E9C46A]/30"></div>
        </header>
      )}

      {renderContenido()}

      <nav className="fixed bottom-8 left-6 right-6 bg-white/90 backdrop-blur-md rounded-[28px] p-2 flex justify-between border border-[#F1E9DF] shadow-xl z-50">
        {[
          {id: 'buscador', l: 'Buscador', i: '🔍'},
          {id: 'operar', l: '+ Operar', i: '➕'},
          {id: 'kardex', l: 'Kárdex', i: '🕒'}
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setSubVista(item.id as any)}
            className={`flex-1 py-3 rounded-[22px] flex flex-col items-center gap-1 transition-all ${subVista === item.id ? 'bg-[#FEF3C7] text-[#D97706]' : 'text-[#1D3557]'}`}
          >
            <span className="text-lg">{item.i}</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">{item.l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}