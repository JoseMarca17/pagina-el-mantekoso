'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiFileText, FiPieChart, FiPlusSquare, FiPackage, FiTrendingUp, FiUser } from 'react-icons/fi';
import './BottomMenu.css';

export default function BottomMenu() {
  const pathname = usePathname();

  // Todos tus módulos unificados en un solo menú deslizable
  const navItems = [
    { id: 'reportes', label: 'REPORTES', icon: <FiFileText size={18} />, path: '/gerente' },
    { id: 'produccion', label: 'PRODUCCIÓN', icon: <FiPieChart size={18} />, path: '/gerente/produccion' },
    { id: 'registrar', label: 'NUEVO', icon: <FiPlusSquare size={18} />, path: '/gerente/inventario/nuevo' },
    { id: 'inventario', label: 'INVENTARIO', icon: <FiPackage size={18} />, path: '/gerente/inventario' },
    { id: 'venta', label: 'VENTA', icon: <FiTrendingUp size={18} />, path: '/gerente/venta' },
    { id: 'cuenta', label: 'GERENTE', icon: <FiUser size={18} />, path: '/gerente/cuenta' },
  ];

  return (
    <div className="bottom-nav-container">
      <nav className="bottom-nav-scrollable">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link 
              key={item.id} 
              href={item.path}
              className={`nav-scroll-btn ${isActive ? 'active' : 'inactive'}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="nav-icon-wrapper">{item.icon}</div>
              <span className="nav-label-text">{item.label}</span>
              {isActive && <span className="nav-active-dot-indicator" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}