"use client";
import React from 'react';
import './Dashboard.css';

export default function DashboardEncargado() {
  return (
    <div className="dashboard-main">
      <div className="header-azul">
        <span className="badge-siscon">SISCON ALMACÉN</span>
        <h1 className="jefe-title">Jefe de Inventario</h1>
        <p className="jefe-subtitle">Control de Existencias & Trazabilidad</p>
      </div>

      <div className="alertas-section">
        <span className="alertas-label">⚠️ ALERTAS DE STOCK CRÍTICO</span>
        <div className="alerta-card">
          <strong>Mantequilla de Campo</strong>
          <p>Quedan: 18 Kg <span className="min-tag">Min: 30Kg</span></p>
        </div>
      </div>

      <div className="operaciones-grid">
        <div className="op-card">🔍 Buscador</div>
        <div className="op-card">➕ Operar</div>
        <div className="op-card">🕒 Kárdex</div>
      </div>
    </div>
  );
}