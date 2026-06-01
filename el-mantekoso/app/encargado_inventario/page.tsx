"use client";
import { useState, useEffect } from 'react';
import Inicio from './InicioEncargado';
import Dashboard from './Dashboard';

/**
 * Componente Principal de la Sección de Encargado.
 * Implementa un sistema de enrutamiento interno basado en estados
 * para separar la vista de perfil de la consola operativa.
 */
export default function EncargadoPage() {
  // Estado para controlar la navegación interna
  const [vista, setVista] = useState<'perfil' | 'dashboard'>('perfil');
  const [loading, setLoading] = useState(false);

  // Efecto visual de carga al cambiar de módulo (Simulación de Auditoría)
  const handleNavigation = (nuevaVista: 'perfil' | 'dashboard') => {
    setLoading(true);
    setTimeout(() => {
      setVista(nuevaVista);
      setLoading(false);
      window.scrollTo(0, 0); // Reset de scroll para la nueva vista
    }, 400); // Pequeño delay para suavizar la transición
  };

  return (
    <main className="min-h-screen bg-[#f4f7fa] selection:bg-blue-100">
      
      {/* Overlay de Carga - Estilo SISCON */}
      {loading && (
        <div className="fixed inset-0 z-[999] bg-[#0f2042]/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-5 rounded-2xl shadow-2xl flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#2355a0] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[10px] font-black text-[#0f2042] tracking-widest uppercase">Validando Credenciales...</span>
          </div>
        </div>
      )}

      <div className={`transition-all duration-500 ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {vista === 'perfil' ? (
          <Inicio onNavigate={() => handleNavigation('dashboard')} />
        ) : (
          <div className="relative">
            {/* Botón flotante para regresar al perfil (Vital para UX) */}
            <button 
              onClick={() => handleNavigation('perfil')}
              className="fixed bottom-6 right-6 z-50 bg-[#0f2042] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#2355a0] transition-all group"
              title="Cerrar Sesión Administrativa"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">➔</span>
            </button>
            
            <Dashboard />
          </div>
        )}
      </div>
    </main>
  );
}