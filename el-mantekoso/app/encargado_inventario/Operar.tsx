"use client";
import React, { useState, useEffect } from 'react';
import { InventarioDB, Producto } from './mockDb';

interface OperarProps {
  db: InventarioDB;
  preselectedId?: number;
  preselectedTab?: 'ingreso' | 'baja';
  onBack: () => void;
  onIngreso: (productoId: number, cantidad: number, lote: string, vence: string) => void;
  onBaja: (productoId: number, cantidad: number, motivo: string) => void;
}

export default function Operar({ 
  db, 
  preselectedId, 
  preselectedTab = 'ingreso', 
  onBack, 
  onIngreso, 
  onBaja 
}: OperarProps) {
  const [tab, setTab] = useState<'ingreso' | 'baja'>('ingreso');
  const [productoId, setProductoId] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(10);
  const [lote, setLote] = useState<string>('');
  const [vence, setVence] = useState<string>('');
  const [motivoBaja, setMotivoBaja] = useState<string>('Vencimiento de lote');
  
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sincronizar preselección
  useEffect(() => {
    if (preselectedTab) {
      setTab(preselectedTab);
    }
    if (preselectedId) {
      setProductoId(preselectedId);
      const prod = db.productos.find(p => p.id === preselectedId);
      if (prod) {
        setLote(prod.lote);
        setVence(prod.vence);
      }
    } else if (db.productos.length > 0) {
      setProductoId(db.productos[0].id);
      setLote(db.productos[0].lote);
      setVence(db.productos[0].vence);
    }
  }, [preselectedId, preselectedTab, db.productos]);

  // Al cambiar de producto, actualizar lote y vencimiento por defecto
  const handleProductoChange = (idStr: string) => {
    const id = parseInt(idStr, 10);
    setProductoId(id);
    const prod = db.productos.find(p => p.id === id);
    if (prod) {
      setLote(prod.lote);
      setVence(prod.vence);
    }
  };

  const selectedProduct = db.productos.find(p => p.id === productoId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedProduct) {
      setErrorMsg("Debe seleccionar un producto válido.");
      return;
    }

    if (cantidad <= 0 || isNaN(cantidad)) {
      setErrorMsg("La cantidad debe ser un número entero mayor a cero.");
      return;
    }

    if (tab === 'baja') {
      if (cantidad > selectedProduct.stock) {
        setErrorMsg(`Stock insuficiente. No puede dar de baja más de ${selectedProduct.stock} ${selectedProduct.unidad}.`);
        return;
      }
    }

    setCargando(true);
    
    setTimeout(() => {
      setCargando(false);
      setExito(true);
      
      if (tab === 'ingreso') {
        onIngreso(productoId, cantidad, lote, vence);
      } else {
        onBaja(productoId, cantidad, motivoBaja);
      }

      // Resetear éxito después de 2 segundos
      setTimeout(() => {
        setExito(false);
        setCantidad(10);
      }, 2000);
    }, 800);
  };

  const motivosDeBaja = [
    "Vencimiento de lote",
    "Daño físico o rotura",
    "Error de empaque",
    "Consumo en cocina (Pruebas)",
    "Pérdida o extravío"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F1] animate-fade-in pb-32">
      
      {/* Header con Botón de Retroceso Circular */}
      <header className="px-6 pt-10 pb-4 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1D3557] border border-[#F1E9DF] active:scale-95 transition-transform font-bold"
        >
          ←
        </button>
        <div>
          <span className="text-[10px] font-black text-[#E9C46A] uppercase tracking-widest block">
            {tab === 'ingreso' ? 'Entradas de Inventario' : 'Ajustes por Mermas'}
          </span>
          <h1 className="text-[20px] font-black text-[#1D3557] font-display">Registro y Ajustes</h1>
        </div>
      </header>

      {/* Selector de Pestañas Estilo Figma */}
      <div className="mx-6 mt-4 bg-white p-1.5 rounded-[22px] flex border border-[#F1E9DF] shadow-sm">
        <button 
          type="button"
          onClick={() => {
            setTab('ingreso');
            setErrorMsg(null);
          }}
          className={`flex-1 py-3 rounded-[18px] text-[11px] font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            tab === 'ingreso' ? 'bg-[#1D3557] text-white shadow-md' : 'text-[#94A3B8]'
          }`}
        >
          📥 Ingreso / Alta
        </button>
        <button 
          type="button"
          onClick={() => {
            setTab('baja');
            setErrorMsg(null);
          }}
          className={`flex-1 py-3 rounded-[18px] text-[11px] font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            tab === 'baja' ? 'bg-[#E63946] text-white shadow-md' : 'text-[#94A3B8]'
          }`}
        >
          ⚠️ Registrar Baja
        </button>
      </div>

      {/* Alerta de Éxito / Modal de Confirmación */}
      {exito && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[99] flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-[45px] p-8 w-full max-w-[320px] text-center border border-[#F1E9DF] shadow-2xl flex flex-col items-center animate-scale-up">
            {/* Animación Checkmark */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200 mb-5">
              <span className="text-3xl">✨</span>
            </div>
            
            <h3 className="font-display text-[18px] font-black text-[#1D3557] mb-2">
              {tab === 'ingreso' ? '¡Entrada Registrada!' : '¡Baja Autorizada!'}
            </h3>
            <p className="text-[12px] text-slate-500 font-bold leading-relaxed mb-4">
              {tab === 'ingreso' 
                ? 'El stock del insumo ha sido reabastecido en el almacén.' 
                : 'La merma fue declarada y se descontó de las existencias.'}
            </p>
            
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-wider border border-green-100 flex items-center gap-1.5 animate-pulse">
              <span>✓</span> Kárdex Actualizado
            </div>
          </div>
        </div>
      )}

      {/* Alerta de Error */}
      {errorMsg && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-[#E63946] px-6 py-4 rounded-[24px] flex items-center gap-3 animate-fade-in">
          <span className="text-xl">🛑</span>
          <div>
            <p className="text-xs font-black">Error de Validación</p>
            <p className="text-[10px] font-bold opacity-80">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Contenedor del Formulario */}
      <div className="mx-6 mt-6 bg-white rounded-[40px] p-8 border border-[#F1E9DF] shadow-sm relative overflow-hidden">
        
        {/* Etiqueta de la Sección */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">{tab === 'ingreso' ? '🤝' : '🥫'}</span>
          <h3 className="text-[9px] font-black text-[#E9C46A] uppercase tracking-[0.15em]">
            {tab === 'ingreso' 
              ? 'Formulario de Abastecimiento Técnico' 
              : 'Declaración de Descarte por Merma'}
          </h3>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Campo: Selección de Producto Relacional */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#94A3B8] ml-2 block">
              Artículo del Inventario
            </label>
            <select
              value={productoId}
              onChange={(e) => handleProductoChange(e.target.value)}
              className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-black text-[#1D3557] outline-none appearance-none cursor-pointer"
            >
              {db.productos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre} ({p.categoria})
                </option>
              ))}
            </select>
          </div>

          {/* Información del Stock Actual del Producto Seleccionado */}
          {selectedProduct && (
            <div className={`p-4 rounded-[18px] border flex justify-between items-center ${
              selectedProduct.stock <= selectedProduct.minStock 
                ? 'bg-red-50/50 border-red-100' 
                : 'bg-green-50/30 border-green-100/50'
            }`}>
              <div>
                <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">Existencias en Almacén</p>
                <p className={`text-[12px] font-black ${
                  selectedProduct.stock <= selectedProduct.minStock ? 'text-[#E63946]' : 'text-green-600'
                }`}>
                  {selectedProduct.stock} {selectedProduct.unidad}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">Stock Mínimo</p>
                <p className="text-[12px] font-black text-slate-500">
                  {selectedProduct.minStock} {selectedProduct.unidad}
                </p>
              </div>
            </div>
          )}

          {/* Fila: Cantidad y Lote / Motivo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94A3B8] ml-2 block">
                {tab === 'ingreso' ? 'Cantidad a Ingresar' : 'Cantidad Física'}
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
                  className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-black text-[#1D3557] outline-none"
                />
                <span className="absolute right-4 text-[10px] text-slate-400 font-bold">
                  {selectedProduct?.unidad}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94A3B8] ml-2 block">
                {tab === 'ingreso' ? 'Código de Lote' : 'Motivo de Baja'}
              </label>
              {tab === 'ingreso' ? (
                <input 
                  type="text" 
                  value={lote}
                  onChange={(e) => setLote(e.target.value)}
                  placeholder="Ej: L-3LECH02"
                  className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-black text-[#1D3557] outline-none"
                />
              ) : (
                <select
                  value={motivoBaja}
                  onChange={(e) => setMotivoBaja(e.target.value)}
                  className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-black text-[#1D3557] outline-none appearance-none cursor-pointer"
                >
                  {motivosDeBaja.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Campo: Fecha (Solo Ingreso) */}
          {tab === 'ingreso' && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94A3B8] ml-2 block">Fecha de Vencimiento</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={vence} 
                  onChange={(e) => setVence(e.target.value)}
                  className="w-full bg-[#FFF9F1] border border-[#F1E9DF] rounded-[20px] p-4 text-[13px] font-black text-[#1D3557] outline-none"
                />
              </div>
            </div>
          )}

          {/* Botón de Acción Principal */}
          <button 
            type="submit"
            disabled={cargando || exito}
            className={`w-full py-5 rounded-[24px] font-black text-[13px] mt-4 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:active:scale-100 ${
              tab === 'ingreso' 
                ? 'bg-[#1D3557] text-white shadow-blue-900/20 hover:bg-[#162944]' 
                : 'bg-[#E63946] text-white shadow-red-900/20 hover:bg-[#cf2b38]'
            }`}
          >
            {cargando ? "Registrando transacción..." : exito ? "¡Listo!" : (
              tab === 'ingreso' ? "Guardar Entrada en Almacén" : "Declarar Descarte y Ajustar Stock"
            )}
          </button>

        </form>
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-10 font-bold px-12 leading-relaxed italic">
        "Las transacciones manuales quedarán registradas en el Kárdex de trazabilidad con fines de auditoría de salubridad."
      </p>
      {/* Spacer para evitar solapamiento con la barra de navegación */}
      <div className="h-32" />
    </div>
  );
}