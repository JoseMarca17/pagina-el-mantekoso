'use client';

import React from 'react';
import HeaderGerente from '@/src/components/gerente/HeaderGerente';
import BottomMenu from '@/src/components/gerente/BottomMenu';

export default function NuevoProductoPage() {
  return (
    <div style={{ backgroundColor: '#FFFBEF', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', maxWidth: '448px', margin: '0 auto', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', paddingBottom: '90px' }}>
        
        {/* Encabezado dinámico basado en tu imagen */}
        <HeaderGerente 
          tag="Inventario + Proveedores" 
          title="Revisar Producto" 
          date="Nuevo producto · Llenar los campos" 
        />
        
        {/* Contenido Central: Últimos agregados */}
        <div style={{ padding: '16px', flex: 1 }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            border: '1px solid #FDFBF7'
          }}>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>📋</span>
                <span style={{ fontWeight: '600', color: '#1E3A5F', fontSize: '14px' }}>Últimos agregados</span>
              </div>
              <span style={{ 
                backgroundColor: '#F7E6C4', 
                color: '#624E31', 
                fontSize: '11px', 
                padding: '2px 8px', 
                borderRadius: '50%', 
                marginLeft: 'auto' 
              }}>0</span>
            </div>

            <div style={{ textAlign: 'center', padding: '30px 0', color: '#9CA3AF', fontSize: '13px' }}>
              Aún no hay productos registrados
            </div>
            
            <div style={{ textAlign: 'center', color: '#C4A484', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>
              Limpiar historial reciente
            </div>
          </div>
        </div>

        {/* Menú de navegación inferior deslizable */}
        <BottomMenu />
        
      </div>
    </div>
  );
}