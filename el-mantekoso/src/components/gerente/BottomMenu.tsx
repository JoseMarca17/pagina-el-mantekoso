import React from 'react';
import { FiFileText, FiPieChart, FiPlusSquare, FiUser } from 'react-icons/fi';
import './BottomMenu.css';

export default function BottomMenu() {
  const navItems = [
    { id: 'reportes', label: 'REPORTES', icon: <FiFileText size={20} />, active: true },
    { id: 'produccion', label: 'PRODUCCION', icon: <FiPieChart size={20} />, active: false },
    { id: 'registrar', label: 'REGISTRAR', icon: <FiPlusSquare size={20} />, active: false },
    { id: 'cuenta', label: 'MI CUENTA', icon: <FiUser size={20} />, active: false },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button 
          key={item.id} 
          className={`nav-btn ${item.active ? 'active' : 'inactive'}`}
        >
          <div className="nav-btn-icon">{item.icon}</div>
          <span className="nav-btn-label">{item.label}</span>
          {item.active && <span className="nav-active-dot" />}
        </button>
      ))}
    </nav>
  );
}