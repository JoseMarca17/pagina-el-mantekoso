import React from 'react';
import { FiCalendar, FiPlus, FiTrash2, FiInbox, FiMapPin } from 'react-icons/fi';
import './ControlProduccion.css';

export default function ControlProduccion() {
  return (
    <div className="report-container" style={{ marginBottom: '100px' }}>
      
      {/* Caja 1: Calendario de Producción */}
      <div className="prod-card-top">
        <div className="prod-row-inline">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>📅</span>
            <h3 className="prod-title-main">Calendario<br/>Producción</h3>
          </div>
          <button className="prod-btn-blue"><FiPlus /> Registrar Producto</button>
        </div>
        
        <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '8px 0' }}>
          ⏱️ Actualiza estados para coordinar fechas con pasteleros
        </p>

        <div className="prod-filter-row">
          <button className="prod-chip active">Todos</button>
          <button className="prod-chip inactive">⏳ Pendiente</button>
          <button className="prod-chip inactive">👩‍🍳 En Cocina</button>
          <button className="prod-chip inactive">✅ Listo</button>
        </div>

        <div style={{ textAlign: 'center', padding: '30px 0', color: '#9CA3AF', fontSize: '13px' }}>
          Sin produccion en curso.
        </div>
        <div style={{ fontSize: '10px', color: '#C4A484', textAlign: 'center' }}>
          🔔 Los estados se sincronizan con los pasteleros
        </div>
      </div>

      {/* Caja 2: Merma Diaria */}
      <div className="prod-card-merma">
        <div className="prod-row-inline">
          <h3 className="prod-title-main">🗑️ 📉 Merma Diaria</h3>
          <button className="prod-merma-btn-red"><FiPlus /> Registrar Merma</button>
        </div>
        <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '6px' }}>
          Registro productos que vencieron o se dañaron al final del día para monitorear pérdidas.
        </p>

        <div className="prod-box-percentage">
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E3A5F' }}>% Merma estimada hoy</span>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#1E3A5F' }}>0%</span>
        </div>

        <div style={{ textAlign: 'center', padding: '24px 0', color: '#9CA3AF', fontSize: '13px' }}>
          No hay registros de merma hoy.
        </div>
        <div style={{ fontSize: '10px', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
          <FiMapPin size={10} /> Monitorea tendencias para ajustar producción
        </div>
      </div>

    </div>
  );
}