import React from 'react';
import { FiFlag, FiBell } from 'react-icons/fi';
import './FormIncidente.css';

export default function FormIncidente() {
  return (
    <div className="report-container" style={{ marginBottom: '100px' }}>
      <div className="form-incidente-card">
        <h2 className="form-incidente-title">
          <span className="form-incidente-icon-flag"><FiFlag /></span>
          ⚠️ Incidente / Novedad
        </h2>
        
        <button className="form-incidente-select-btn">
          Gravedad Baja
        </button>

        <textarea 
          className="form-incidente-textarea" 
          placeholder="Descripcion"
        />

        <button className="form-incidente-submit-btn">
          <FiBell /> Reportar incidente
        </button>
      </div>
    </div>
  );
}