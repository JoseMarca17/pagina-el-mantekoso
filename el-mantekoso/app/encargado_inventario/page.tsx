"use client";
import { useState } from 'react';
import Inicio from './InicioEncargado';
import Dashboard from './Dashboard';

export default function EncargadoPage() {
  const [vista, setVista] = useState<'perfil' | 'dashboard'>('perfil');

  const handleNavigation = (nuevaVista: 'perfil' | 'dashboard') => {
    setVista(nuevaVista);
    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen bg-[#FFF9F1]">
      {vista === 'perfil' ? (
        <Inicio onNavigate={() => handleNavigation('dashboard')} />
      ) : (
        <div className="relative">
          {/* CORRECCIÓN: Se pasa la prop onBack requerida por el Dashboard */}
          <Dashboard onBack={() => handleNavigation('perfil')} />
        </div>
      )}
    </main>
  );
}