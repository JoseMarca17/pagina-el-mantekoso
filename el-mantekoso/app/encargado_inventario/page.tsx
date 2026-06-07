"use client";
import { useState, useEffect } from 'react';
import Inicio from './InicioEncargado';
import Dashboard from './Dashboard';
import { loadDatabase, saveDatabase, InventarioDB, KardexRegistro } from './mockDb';

export default function EncargadoPage() {
  const [vista, setVista] = useState<'perfil' | 'dashboard'>('perfil');
  const [subVistaDestino, setSubVistaDestino] = useState<'home' | 'buscador' | 'operar' | 'kardex'>('home');
  const [db, setDb] = useState<InventarioDB | null>(null);

  // Cargar base de datos de localStorage en el cliente
  useEffect(() => {
    setDb(loadDatabase());
  }, []);

  const handleNavigation = (nuevaVista: 'perfil' | 'dashboard', subVista: 'home' | 'buscador' | 'operar' | 'kardex' = 'home') => {
    setVista(nuevaVista);
    setSubVistaDestino(subVista);
    window.scrollTo(0, 0);
  };

  const handleIngreso = (productoId: number, cantidad: number, lote: string, vence: string) => {
    if (!db) return;

    const nuevosProductos = db.productos.map((prod) => {
      if (prod.id === productoId) {
        return {
          ...prod,
          stock: prod.stock + cantidad,
          lote: lote || prod.lote,
          vence: vence || prod.vence,
          ingreso: `Hoy (+${cantidad} ${prod.unidad})`
        };
      }
      return prod;
    });

    const targetProducto = db.productos.find(p => p.id === productoId);
    if (!targetProducto) return;

    const nuevoRegistro: KardexRegistro = {
      id: db.kardex.length > 0 ? Math.max(...db.kardex.map(k => k.id)) + 1 : 1,
      tipo: 'Entrada',
      productoId,
      productoNombre: targetProducto.nombre,
      cantidad,
      unidad: targetProducto.unidad,
      motivo: "Reabastecimiento manual",
      fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      lote: lote || targetProducto.lote,
      responsable: "Andrés Cruz"
    };

    const nuevaDB = {
      productos: nuevosProductos,
      kardex: [nuevoRegistro, ...db.kardex]
    };

    setDb(nuevaDB);
    saveDatabase(nuevaDB);
  };

  const handleBaja = (productoId: number, cantidad: number, motivo: string) => {
    if (!db) return;

    const nuevosProductos = db.productos.map((prod) => {
      if (prod.id === productoId) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cantidad)
        };
      }
      return prod;
    });

    const targetProducto = db.productos.find(p => p.id === productoId);
    if (!targetProducto) return;

    const nuevoRegistro: KardexRegistro = {
      id: db.kardex.length > 0 ? Math.max(...db.kardex.map(k => k.id)) + 1 : 1,
      tipo: 'Ajuste',
      productoId,
      productoNombre: targetProducto.nombre,
      cantidad: -cantidad,
      unidad: targetProducto.unidad,
      motivo: `Baja: ${motivo}`,
      fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      lote: targetProducto.lote,
      responsable: "Andrés Cruz"
    };

    const nuevaDB = {
      productos: nuevosProductos,
      kardex: [nuevoRegistro, ...db.kardex]
    };

    setDb(nuevaDB);
    saveDatabase(nuevaDB);
  };

  if (!db) {
    return (
      <div className="min-h-screen bg-[#FFF9F1] flex items-center justify-center">
        <p className="font-bold text-[#1D3557] animate-pulse">Cargando almacén...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F1]">
      {vista === 'perfil' ? (
        <Inicio 
          db={db}
          onNavigate={(subVista) => handleNavigation('dashboard', subVista)} 
        />
      ) : (
        <div className="relative">
          <Dashboard 
            db={db}
            initialSubVista={subVistaDestino}
            onBack={() => handleNavigation('perfil')} 
            onIngreso={handleIngreso}
            onBaja={handleBaja}
          />
        </div>
      )}
    </main>
  );
}