'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      backgroundColor: '#FFFBEF', 
      minHeight: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Contenedor que limita el diseño mobile/clean */}
      <div style={{ 
        width: '100%', 
        maxWidth: '448px', 
        textAlign: 'center',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '40px'
      }}>
        
        {/* Título Principal */}
        <h1 style={{ 
          color: '#1E3A5F', 
          fontSize: '28px', 
          fontWeight: '700',
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          Elija módulo
        </h1>

        {/* Botón / Cuadrado de Redirección */}
        <Link href="/gerente" style={{ textDecoration: 'none', width: '80%' }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #FFF5E0',
            borderRadius: '24px',
            aspectRatio: '1 / 1', /* Lo mantiene perfectamente cuadrado */
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 25px rgba(30, 58, 95, 0.05)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(30, 58, 95, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(30, 58, 95, 0.05)';
          }}
          >
            {/* Icono decorativo estilo pastelería / corporativo */}
            <span style={{ fontSize: '48px' }}>💼</span>
            
            <span style={{
              color: '#1E3A5F',
              fontSize: '18px',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              Gerente
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
}