import React from 'react';
import { FiFlag, FiBell } from 'react-icons/fi';
import './FormIncidente.css'; // Reutiliza la misma estructura visual de Incidentes

export default function FormMerma() {
  return (
    <div className="report-container" style={{ marginBottom: '100px' }}>
      <div className="form-incidente-card">
        <h2 className="form-incidente-title">
          <span className="form-incidente-icon-flag"><FiFlag /></span>
          Merma
        </h2>
        
        <input 
          type="text" 
          className="form-personal-input" 
          placeholder="$ Merma" 
          style={{backgroundColor: '#FFFDF7', border: '1px solid #FFE8CC'}}
        />

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