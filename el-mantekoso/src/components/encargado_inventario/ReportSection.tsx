import "./ReportSection.css";
import MetricCards from "./MetricCards";

interface Item {
  id: string;
  nombre: string;
  categoria: string;
  stockActual: number;
  stockMinimo: number;
  unidad: string;
}

export default function ReportSection({ items }: { items: Item[] }) {
  return (
    <div className="report-container">
      {items.map((item) => (
        <div key={item.id} className="inventory-item">
          <div className="item-header">
            <span className="item-name">{item.nombre}</span>
            <span className="category-tag">{item.categoria}</span>
          </div>
          <MetricCards 
            actual={item.stockActual} 
            minimo={item.stockMinimo} 
            unidad={item.unidad} 
          />
        </div>
      ))}
    </div>
  );
}