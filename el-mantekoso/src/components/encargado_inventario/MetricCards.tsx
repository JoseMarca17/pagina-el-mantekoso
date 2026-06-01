import "./MetricCards.css";

interface Props {
  actual: number;
  minimo: number;
  unidad: string;
}

export default function MetricCards({ actual, minimo, unidad }: Props) {
  const esAlerta = actual <= minimo;
  
  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <span className="metric-label">En Almacén</span>
        <span className={`metric-value ${esAlerta ? 'status-alert' : 'status-ok'}`}>
          {actual} {unidad}
        </span>
      </div>
      <div className="metric-card">
        <span className="metric-label">Stock Mínimo</span>
        <span className="metric-value" style={{color: '#334155'}}>
          {minimo} {unidad}
        </span>
      </div>
    </div>
  );
}