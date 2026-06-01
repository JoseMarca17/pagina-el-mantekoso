import React from 'react';
import { FiUserPlus, FiClock } from 'react-icons/fi';
import './FormPersonal.css';

export default function FormPersonal() {
  return (
    <div className="report-container" style={{ marginBottom: '100px' }}>
      <div className="form-personal-card">
        <div className="form-personal-header">
          <span className="form-personal-avatar-icon"><FiUserPlus /></span>
          📋 Registrar Personal
        </div>

        <input 
          type="text" 
          className="form-personal-input" 
          placeholder="Nombre completo" 
        />

        <input 
          type="text" 
          className="form-personal-input" 
          placeholder="Rol / Turno (Ej: Pastelero, Cajero)" 
        />

        <button className="form-personal-submit-btn">
          <FiClock /> Registrar ingreso
        </button>
      </div>
    </div>
  );
}