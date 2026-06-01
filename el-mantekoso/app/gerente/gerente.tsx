import React from 'react';
// Salimos de 'gerente', salimos de 'app' y entramos a 'src/components/gerente'
import HeaderGerente from '../../src/components/gerente/HeaderGerente';
import MetricCards from '../../src/components/gerente/MetricCards';
import ReportSection from '../../src/components/gerente/ReportSection';
import BottomMenu from '../../src/components/gerente/BottomMenu';

export default function GerentePage() {
  return (
    <div style={{ backgroundColor: '#FFFBEF', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Contenedor que limita el ancho para simular un celular (Mobile First) */}
      <div style={{ width: '100%', maxWidth: '448px', margin: '0 auto', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
        <HeaderGerente />
        <MetricCards />
        <ReportSection />
        <BottomMenu />
      </div>
    </div>
  );
}