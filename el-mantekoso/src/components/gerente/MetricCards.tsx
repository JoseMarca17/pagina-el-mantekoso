import React from 'react';
import { FiTrendingUp, FiUsers, FiAlertTriangle } from 'react-icons/fi';
import './MetricCards.css';

export default function MetricCards() {
  const metrics = [
    { id: 1, label: 'Ventas Hoy', value: '$0.00', icon: <FiTrendingUp /> },
    { id: 2, label: 'Personal', value: '0', icon: <FiUsers /> }, // ¡Corregido aquí!
    { id: 3, label: 'Incidentes', value: '0', icon: <FiAlertTriangle /> },
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((item) => (
        <div key={item.id} className="metric-card">
          <div className="metric-icon">{item.icon}</div>
          <span className="metric-label">{item.label}</span>
          <span className="metric-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}