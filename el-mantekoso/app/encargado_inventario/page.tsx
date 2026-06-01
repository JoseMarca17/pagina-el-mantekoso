"use client";
import { useState } from 'react';
import Inicio from './Inicio';
import Dashboard from './Dashboard';

export default function EncargadoPage() {
  // Estado para cambiar entre "perfil" y "dashboard"
  const [vista, setVista] = useState<'perfil' | 'dashboard'>('perfil');

  return (
    <main>
      {vista === 'perfil' ? (
        <Inicio onNavigate={() => setVista('dashboard')} />
      ) : (
        <Dashboard />
      )}
    </main>
  );
}