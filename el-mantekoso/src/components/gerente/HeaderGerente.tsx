import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import './HeaderGerente.css'; 

interface HeaderGerenteProps {
  tag?: string;
  title?: string;
  date?: string;
}

export default function HeaderGerente({ 
  tag = "Gerencia", 
  title = "Panel Diario", 
  date = "22/05/2026" 
}: HeaderGerenteProps) {
  return (
    <header className="gerente-header">
      <div className="gerente-header-left">
        <div className="gerente-logo-cupcake"> </div>
        <div className="gerente-title-container">
          <span className="gerente-tag">{tag}</span>
          <h1 className="gerente-title">{title}</h1>
          <div className="gerente-date-container">
            <FiCalendar />
            <span>{date}</span>
          </div>
        </div>
      </div>
      <button className="gerente-calendar-btn">
        <FiCalendar size={18} />
      </button>
    </header>
  );
}