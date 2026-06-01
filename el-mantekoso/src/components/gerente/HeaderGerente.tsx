import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import './HeaderGerente.css'; // Importación directa y limpia

export default function HeaderGerente() {
  return (
    <header className="gerente-header">
      <div className="gerente-header-left">
        <div className="gerente-logo-cupcake"> </div>
        <div className="gerente-title-container">
          <span className="gerente-tag">Gerencia</span>
          <h1 className="gerente-title">Panel Diario</h1>
          <div className="gerente-date-container">
            <FiCalendar />
            <span>22/05/2026</span>
          </div>
        </div>
      </div>
      <button className="gerente-calendar-btn">
        <FiCalendar size={18} />
      </button>
    </header>
  );
}