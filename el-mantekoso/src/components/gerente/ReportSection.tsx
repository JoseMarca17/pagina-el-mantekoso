import React from 'react';
import { FiClipboard } from 'react-icons/fi';
import './ReportSection.css';

export default function ReportSection() {
  const reportCount = 0; 

  return (
    <div className="report-container">
      <div className="report-card">
        
        <div className="report-header">
          <span className="report-header-icon">📋</span>
          <h2 className="report-title">Reportes de hoy</h2>
          <span className="report-badge">{reportCount}</span>
        </div>

        <div className="report-placeholder">
          <div className="report-placeholder-icon">
            <FiClipboard strokeWidth={1} />
          </div>
          <p className="report-main-text">Sin reportes hoy.</p>
          <p className="report-sub-text">Usa los formularios para comenzar.</p>
        </div>

      </div>

      <div className="report-footer">
        <span> </span> Registros almacenados localmente · El Mantekoso
      </div>
    </div>
  );
}