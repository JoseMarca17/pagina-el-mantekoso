import "./HeaderEncargado.css";

interface Props {
  onLogout: () => void;
}

export default function HeaderEncargado({ onLogout }: Props) {
  return (
    <header className="header-container">
      <div className="header-text-group">
        <span className="header-label">Control de Existencias</span>
        <h1 className="header-title">Jefe de Inventario 📋</h1>
      </div>
      <button onClick={onLogout} className="btn-logout">
        Cerrar Sesión
      </button>
    </header>
  );
}