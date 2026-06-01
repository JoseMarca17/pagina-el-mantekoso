"use client";
import React from 'react';
import './Dashboard.css';

export default function DashboardEncargado() {
  return (
    <div className="dashboard-container">
      {/* Header Principal - Fondo Navy con curva inferior */}
      <header className="dash-header">
        <div className="status-bar-sim">
          <span>9:41</span>
          <div className="status-icons">📶 🔋</div>
        </div>
        <div className="header-content">
          <span className="tag-almacen">SISCON ALMACÉN</span>
          <h1 className="title-jefe">Jefe de Inventario</h1>
          <p className="subtitle-jefe">Control de Existencias & Trazabilidad</p>
        </div>
        <div className="user-avatar-small"></div>
      </header>

      <main className="dash-content">
        {/* Sección: Alertas de Stock */}
        <section className="section-block">
          <div className="section-header">
            <h3 className="text-danger">⚠️ ALERTAS DE STOCK CRÍTICO (HU2)</h3>
            <span className="count-badge">2 ítems</span>
          </div>
          <div className="horizontal-scroll">
            <div className="card-alert border-red">
              <p className="prod-name">Mantequilla de Campo</p>
              <p className="prod-cat">Categoría: Insumos</p>
              <p className="prod-status"><span className="text-red">Quedan: 18 Kg</span> <span className="tag-min">Mín: 30Kg</span></p>
            </div>
            <div className="card-alert border-red">
              <p className="prod-name">Coca Cola 500ml</p>
              <p className="prod-cat">Categoría: Bebidas</p>
              <p className="prod-status"><span className="text-red">Quedan: 5 Uds</span> <span className="tag-min">Mín: 24</span></p>
            </div>
          </div>
        </section>

        {/* Sección: Vencimientos */}
        <section className="section-block">
          <h3 className="text-gold">⏳ PRÓXIMOS A VENCER (HU4)</h3>
          <div className="card-list">
            <div className="list-item">
              <div>
                <p className="item-main">Crema de Leche PIL</p>
                <p className="item-sub">Lote: #C-204 • Cantidad: 12 Lts</p>
              </div>
              <span className="tag-vence">Vence en 2 días</span>
            </div>
            <div className="list-item">
              <div>
                <p className="item-main">Mermelada Frutos Rojos</p>
                <p className="item-sub">Lote: #M-911 • Cantidad: 6 Kg</p>
              </div>
              <span className="tag-vence">Vence en 4 days</span>
            </div>
          </div>
        </section>

        {/* Sección: Sincronización */}
        <section className="section-block">
          <h3 className="text-muted">📊 SINCRONIZACIÓN AUTOMÁTICA (HU3)</h3>
          <div className="grid-2">
            <div className="card-sync">
              <span className="sync-icon">📥</span>
              <p className="sync-title">Ingresos Hoy</p>
              <p className="sync-val text-green">+145 Unidades</p>
            </div>
            <div className="card-sync">
              <span className="sync-icon">🤖</span>
              <p className="sync-title">Ventas Automáticas</p>
              <p className="sync-val text-blue">-89 Descuentos</p>
            </div>
          </div>
        </section>

        {/* Barra de Navegación Inferior (Botones funcionales) */}
        <nav className="nav-footer-grid">
          <button className="nav-btn active">
            <span className="nav-icon">🔍</span>
            <p>Buscador</p>
          </button>
          <button className="nav-btn">
            <span className="nav-icon">➕</span>
            <p>+ Operar</p>
          </button>
          <button className="nav-btn">
            <span className="nav-icon">🕒</span>
            <p>Kárdex</p>
          </button>
        </nav>
      </main>
    </div>
  );
}