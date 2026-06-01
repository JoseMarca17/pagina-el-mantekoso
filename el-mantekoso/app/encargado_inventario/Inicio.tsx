"use client";
import React from 'react';
import './inicio.css';

export default function InicioEncargado({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1 className="perfil-title">Mi Perfil</h1>
      </div>

      <div className="card-usuario">
        <div className="avatar-circle">👨‍💻</div>
        <h2 className="usuario-nombre">Andrés Cruz</h2>
        <p className="usuario-email">andres.cruz@emi.edu.bo</p>
        <div className="badge-puntos">✨ 450 Puntos Mantekosos</div>
      </div>

      <div className="opciones-cliente">
        <div className="opcion-item">🛍️ Historial de Pedidos <span>➔</span></div>
        <div className="opcion-item">📍 Mis Direcciones <span>➔</span></div>
      </div>

      <div className="area-tecnica-box">
        <span className="label-tecnico">ÁREA PERSONAL TÉCNICO</span>
        <button className="btn-admin-access" onClick={onNavigate}>
          🔒 Modo Administrador
        </button>
      </div>
    </div>
  );
}