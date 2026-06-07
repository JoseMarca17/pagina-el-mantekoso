"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InventarioDB } from './mockDb';

interface InicioEncargadoProps {
  db: InventarioDB;
  onNavigate: (subVista: 'home' | 'buscador' | 'operar' | 'kardex') => void;
}

export default function InicioEncargado({ db, onNavigate }: InicioEncargadoProps) {
  const router = useRouter();
  
  // Alertas dinámicas basadas en la base de datos simulada
  const alertasStockCount = db.productos.filter(p => p.stock <= p.minStock).length;
  
  const opciones = [
    { 
      icon: "🔍", 
      label: "Buscador de Almacén", 
      subVista: 'buscador' as const,
      badge: `${db.productos.length} ítems`,
      badgeColor: 'bg-blue-50 text-blue-600 border border-blue-100'
    },
    { 
      icon: "⚠️", 
      label: "Alertas de Stock Crítico", 
      subVista: 'home' as const,
      badge: alertasStockCount > 0 ? `${alertasStockCount} alertas` : 'Sin alertas',
      badgeColor: alertasStockCount > 0 ? 'bg-red-50 text-red-600 border border-red-100 font-black' : 'bg-green-50 text-green-600 border border-green-100'
    },
    { 
      icon: "🕒", 
      label: "Kárdex de Movimientos", 
      subVista: 'kardex' as const,
      badge: `${db.kardex.length} trans.`,
      badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100'
    },
    {
      icon: "➕",
      label: "Operar Ingreso / Ajustes",
      subVista: 'operar' as const,
      badge: "Operar",
      badgeColor: 'bg-[#1D3557]/10 text-[#1D3557]'
    },
    {
      icon: "🚪",
      label: "Cerrar Sesión",
      subVista: null,
      badge: "Salir",
      badgeColor: 'bg-red-50 text-red-600 border border-red-100 font-bold',
      action: 'logout'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F1] font-sans pb-36">
      
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
      <div className="mx-8 bg-white rounded-[45px] py-8 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#F1E9DF]">
        <div className="w-[110px] h-[110px] rounded-full border-2 border-[#E9C46A] flex items-center justify-center bg-[#FFF9F1] overflow-hidden mb-4 relative">
          <span className="text-[50px]">👨‍💻</span>
        </div>
        
        <h2 className="font-display text-[20px] font-black text-[#1D3557]">Andrés Cruz</h2>
        <span className="text-[9px] bg-slate-100 text-slate-600 font-extrabold px-3 py-1 rounded-full mt-1 uppercase tracking-widest border border-slate-200">
          Jefe de Almacén y Logística
        </span>
        <p className="text-[11px] text-[#94A3B8] font-bold mt-2">andres.cruz@emi.edu.bo</p>
        
        {/* Estadísticas de Trabajo del Encargado */}
        <div className="grid grid-cols-2 gap-4 w-full px-8 mt-6 border-t border-dashed border-[#F1E9DF] pt-6">
          <div className="text-center">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Turno Laboral</span>
            <p className="text-[12px] font-black text-[#1D3557] mt-0.5">07:00 - 15:00</p>
          </div>
          <div className="text-center border-l border-slate-100">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Precisión Stock</span>
            <p className="text-[12px] font-black text-green-600 mt-0.5">99.4% Efic.</p>
          </div>
        </div>

        <div className="mt-6 bg-[#FFFBEB] px-6 py-2.5 rounded-full border border-[#FEF3C7]">
          <span className="text-[11px] font-black text-[#D97706] tracking-tight">✨ 450 Puntos Mantekosos</span>
        </div>
      </div>

      {/* Listado de Opciones del Perfil de Almacén */}
      <div className="mt-8 px-8 space-y-4">
        {opciones.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.action === 'logout') {
                router.push('/registro');
              } else if (item.subVista) {
                onNavigate(item.subVista);
              }
            }}
            className="w-full bg-white flex items-center justify-between px-6 py-[18px] rounded-[24px] shadow-sm border border-[#F1E9DF] active:scale-[0.98] transition-transform text-left"
          >
            <div className="flex items-center gap-5">
              <span className="text-[18px]">{item.icon}</span>
              <div>
                <span className="text-[13px] font-bold text-[#1D3557] block">{item.label}</span>
                <span className="text-[10px] text-slate-400 font-semibold">
                  {item.action === 'logout' ? 'Salir del panel' : 'Gestionar módulo'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
              <span className="text-[#CBD5E1] text-[20px]">›</span>
            </div>
          </button>
        ))}
      </div>

      {/* Área Personal Técnico */}
      <div className="mt-8 mx-8 p-7 bg-[#FFFAF3] rounded-[35px] border border-[#FDECD7] flex flex-col items-center shadow-sm">
        <span className="text-[10px] font-black text-[#A8B2C1] tracking-[0.2em] mb-4 uppercase">Panel de Control General</span>
        <button
          onClick={() => onNavigate('home')}
          className="w-full bg-[#1D3557] text-white py-4.5 rounded-[22px] font-black text-[13px] flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:bg-[#152A47] transition-all"
        >
          <span>🔐</span> Modo Administrador
        </button>
      </div>

      {/* Spacer para evitar solapamiento del navbar */}
      <div className="h-20" />

      {/* Tab Bar Navegación Inferior (Fijo) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md border-t border-[#F1E9DF] px-10 py-5 flex justify-between items-center rounded-t-[40px] shadow-[0_-5px_20px_rgba(0,0,0,0.02)] z-40">
        <Link href="/inicio" className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[22px]">🏠</span>
          <span className="text-[9px] font-black mt-1.5 uppercase">Inicio</span>
        </Link>
        <Link href="/vitrina" className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[22px]">🍪</span>
          <span className="text-[9px] font-black mt-1.5 uppercase tracking-tighter">Vitrina</span>
        </Link>
        <Link href="/nosotros" className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[22px]">❤️</span>
          <span className="text-[9px] font-black mt-1.5 uppercase tracking-tighter">Nosotros</span>
        </Link>
        <Link href="/encargado_inventario" className="flex flex-col items-center text-[#1D3557]">
          <span className="text-[22px]">👤</span>
          <span className="text-[9px] font-black mt-1.5 uppercase tracking-tighter">Cuenta</span>
          <div className="w-1.5 h-1.5 bg-[#1D3557] rounded-full mt-1"></div>
        </Link>
      </nav>

    </div>
  );
}