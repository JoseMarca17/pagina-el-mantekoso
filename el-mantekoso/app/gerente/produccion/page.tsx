'use client';

import React from 'react';
import HeaderGerente from '@/src/components/gerente/HeaderGerente';
import ControlProduccion from '@/src/components/gerente/ControlProduccion';
import BottomMenu from '@/src/components/gerente/BottomMenu';

export default function ProduccionPage() {
  return (
    <div style={{ backgroundColor: '#FFFBEF', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', maxWidth: '448px', margin: '0 auto', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
        
        <HeaderGerente 
          tag="Producción + Merma" 
          title="Control Total" 
          date="26/05/2026" 
        />
        
        <ControlProduccion />
        
        <BottomMenu />
        
      </div>
    </div>
  );
}