"use client";
import { useState } from "react";

type Nivel = "critico" | "bajo" | "ok";

interface Insumo {
  id: number;
  nombre: string;
  stock: string;
  diasProd: string;
  minimo: string;
  nivel: Nivel;
  emoji: string;
}

const insumosIniciales: Insumo[] = [
  { id: 1, nombre: "Harina",      stock: "Solo 2 kg",     diasProd: "1 día de producción",  minimo: "10 kg",   nivel: "critico", emoji: "🌾" },
  { id: 2, nombre: "Huevos",      stock: "12 unidades",   diasProd: "2 días",               minimo: "36 und",  nivel: "bajo",    emoji: "🥚" },
  { id: 3, nombre: "Mantequilla", stock: "500g",          diasProd: "2 días",               minimo: "2 kg",    nivel: "bajo",    emoji: "🧈" },
  { id: 4, nombre: "Azúcar",      stock: "5 kg",          diasProd: "",                     minimo: "3 kg",    nivel: "ok",      emoji: "🍬" },
  { id: 5, nombre: "Leche",       stock: "10 L",          diasProd: "",                     minimo: "5 L",     nivel: "ok",      emoji: "🥛" },
  { id: 6, nombre: "Fresa",       stock: "2 kg",          diasProd: "",                     minimo: "1 kg",    nivel: "ok",      emoji: "🍓" },
  { id: 7, nombre: "Chocolate",   stock: "800g",          diasProd: "3 días",               minimo: "1.5 kg",  nivel: "bajo",    emoji: "🍫" },
];

const labelNivel: Record<Nivel, string> = {
  critico: "Crítico",
  bajo:    "Bajo",
  ok:      "✅",
};

const colorNivel: Record<Nivel, string> = {
  critico: "#e74c3c",
  bajo:    "#e67e22",
  ok:      "#27ae60",
};

export default function AlertasDueno() {
  const [insumos, setInsumos] = useState(insumosIniciales);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Insumo | null>(null);
  const [nuevoMin, setNuevoMin] = useState("");

  const criticos = insumos.filter((i) => i.nivel === "critico");
  const bajos    = insumos.filter((i) => i.nivel === "bajo");
  const enOrden  = insumos.filter((i) => i.nivel === "ok");

  const abrirEditar = (ins: Insumo) => {
    setEditando(ins);
    setNuevoMin(ins.minimo);
    setModalOpen(true);
  };

  const guardarMinimo = () => {
    if (!editando) return;
    setInsumos((prev) =>
      prev.map((i) => i.id === editando.id ? { ...i, minimo: nuevoMin } : i)
    );
    setModalOpen(false);
  };

  return (
    <main className="page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="avatar">🧁</div>
          <div>
            <h1 className="page-title">Alertas</h1>
            <p className="page-sub">{criticos.length} insumo{criticos.length !== 1 ? "s" : ""} crítico{criticos.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <button className="notif-btn">🔔</button>
      </header>

      {/* Banner aviso */}
      {criticos.length > 0 && (
        <div className="banner-aviso">
          <span>⚠️ Reabastecer antes de mañana</span>
          <button className="banner-link" onClick={() => setModalOpen(true)}>
            Configurar mínimos →
          </button>
        </div>
      )}

      {/* Críticos */}
      {criticos.length > 0 && (
        <section className="section">
          <h3 className="section-title">🔴 CRÍTICOS</h3>
          {criticos.map((ins) => (
            <InsumoCard key={ins.id} ins={ins} onEditar={abrirEditar} />
          ))}
        </section>
      )}

      {/* Bajos */}
      {bajos.length > 0 && (
        <section className="section">
          <h3 className="section-title">🟠 STOCK BAJO</h3>
          {bajos.map((ins) => (
            <InsumoCard key={ins.id} ins={ins} onEditar={abrirEditar} />
          ))}
        </section>
      )}

      {/* En orden */}
      <section className="section">
        <h3 className="section-title">🟢 EN ORDEN</h3>
        {enOrden.map((ins) => (
          <div key={ins.id} className="insumo-ok">
            <span className="insumo-emoji">{ins.emoji}</span>
            <span className="insumo-nombre-ok">{ins.nombre}</span>
            <span className="insumo-stock-ok">{ins.stock}</span>
            <span className="ok-check">✅</span>
          </div>
        ))}
      </section>

      {/* Botón configurar */}
      <div className="btn-wrap">
        <button className="btn-config" onClick={() => { setEditando(null); setModalOpen(true); }}>
          ⚙️ Configurar niveles mínimos
        </button>
      </div>

      {/* Modal editar mínimo */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              {editando ? `Editar mínimo · ${editando.nombre}` : "Configurar mínimos"}
            </h3>
            {editando ? (
              <>
                <p className="modal-sub">Stock actual: <strong>{editando.stock}</strong></p>
                <input
                  className="modal-input"
                  value={nuevoMin}
                  onChange={(e) => setNuevoMin(e.target.value)}
                  placeholder="Ej: 5 kg"
                />
                <div className="modal-btns">
                  <button className="modal-cancel" onClick={() => setModalOpen(false)}>Cancelar</button>
                  <button className="modal-save" onClick={guardarMinimo}>Guardar</button>
                </div>
              </>
            ) : (
              <>
                <p className="modal-sub">Selecciona un insumo para editar su nivel mínimo.</p>
                <div className="modal-list">
                  {insumos.map((ins) => (
                    <button key={ins.id} className="modal-ins-btn" onClick={() => {
                      setEditando(ins); setNuevoMin(ins.minimo);
                    }}>
                      <span>{ins.emoji} {ins.nombre}</span>
                      <span style={{ color: colorNivel[ins.nivel], fontSize: 12 }}>
                        mín: {ins.minimo}
                      </span>
                    </button>
                  ))}
                </div>
                <button className="modal-cancel" style={{ width: "100%", marginTop: 8 }} onClick={() => setModalOpen(false)}>Cerrar</button>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .page {
          min-height: 100vh; background: #fdf6ec;
          font-family: 'DM Sans', sans-serif;
          max-width: 430px; margin: 0 auto; padding-bottom: 100px;
        }

        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 20px 12px;
        }

        .header-left { display: flex; align-items: center; gap: 12px; }

        .avatar {
          width: 44px; height: 44px; background: #1a2744; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; font-size: 22px;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; color: #1a2744; margin: 0;
        }

        .page-sub { font-size: 12px; color: #e74c3c; margin: 0; font-weight: 500; }

        .notif-btn { background: none; border: none; font-size: 22px; cursor: pointer; }

        .banner-aviso {
          margin: 0 16px 12px;
          background: #fff0f0; border-left: 3px solid #e74c3c;
          border-radius: 12px; padding: 10px 14px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 13px; color: #c0392b; font-weight: 500;
        }

        .banner-link {
          background: none; border: none; cursor: pointer;
          font-size: 12px; color: #e74c3c; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
        }

        .section { padding: 4px 16px 4px; }

        .section-title {
          font-size: 11px; font-weight: 700; color: #aaa;
          letter-spacing: 1px; text-transform: uppercase;
          margin: 12px 0 8px;
        }

        .insumo-ok {
          display: flex; align-items: center; gap: 10px;
          background: #fff; border-radius: 12px; padding: 12px 14px;
          margin-bottom: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .insumo-emoji { font-size: 18px; }
        .insumo-nombre-ok { flex: 1; font-size: 14px; font-weight: 600; color: #1a2744; }
        .insumo-stock-ok { font-size: 13px; color: #888; }
        .ok-check { font-size: 16px; }

        .btn-wrap { padding: 12px 16px; }

        .btn-config {
          width: 100%; background: #1a2744; color: #fff;
          border: none; padding: 15px; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 600; cursor: pointer; transition: background 0.2s;
        }

        .btn-config:hover { background: #243460; }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: flex-end; justify-content: center;
          z-index: 200; padding: 0;
        }

        .modal-card {
          background: #fdf6ec; border-radius: 24px 24px 0 0;
          padding: 24px 20px 36px; width: 100%; max-width: 430px;
        }

        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px; color: #1a2744; margin: 0 0 6px;
        }

        .modal-sub { font-size: 13px; color: #888; margin: 0 0 14px; }

        .modal-input {
          width: 100%; border: 1.5px solid #e8dcc8; border-radius: 10px;
          padding: 12px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px;
          background: #fff; color: #1a2744; outline: none;
          box-sizing: border-box; margin-bottom: 14px;
        }

        .modal-btns { display: flex; gap: 10px; }

        .modal-cancel {
          flex: 1; background: #f0e8d5; color: #1a2744; border: none;
          padding: 12px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          font-weight: 600; cursor: pointer;
        }

        .modal-save {
          flex: 1; background: #1a2744; color: #fff; border: none;
          padding: 12px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          font-weight: 600; cursor: pointer;
        }

        .modal-list { display: flex; flex-direction: column; gap: 6px; max-height: 280px; overflow-y: auto; }

        .modal-ins-btn {
          display: flex; justify-content: space-between; align-items: center;
          background: #fff; border: 1.5px solid #e8dcc8; border-radius: 10px;
          padding: 10px 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          font-weight: 500; color: #1a2744; transition: border-color 0.2s;
        }

        .modal-ins-btn:hover { border-color: #1a2744; }
      `}</style>
    </main>
  );
}

function InsumoCard({ ins, onEditar }: { ins: Insumo; onEditar: (i: Insumo) => void }) {
  const colorMap: Record<Nivel, string> = {
    critico: "#fff0f0",
    bajo:    "#fff8f0",
    ok:      "#f0fff4",
  };
  const borderMap: Record<Nivel, string> = {
    critico: "#e74c3c",
    bajo:    "#e67e22",
    ok:      "#27ae60",
  };

  return (
    <div
      style={{
        background: colorMap[ins.nivel],
        borderLeft: `4px solid ${borderMap[ins.nivel]}`,
        borderRadius: 14, padding: "13px 14px",
        marginBottom: 8, display: "flex",
        alignItems: "center", gap: 12,
      }}
    >
      <span style={{ fontSize: 22 }}>{ins.emoji}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a2744", fontFamily: "'DM Sans', sans-serif" }}>
          {ins.nombre}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 13, color: borderMap[ins.nivel], fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
          {ins.stock} · {ins.diasProd}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>
          Mínimo: {ins.minimo}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <span
          style={{
            background: borderMap[ins.nivel], color: "#fff",
            fontSize: 11, fontWeight: 700, padding: "3px 10px",
            borderRadius: 20, fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {ins.nivel === "critico" ? "Crítico" : "Bajo"}
        </span>
        <button
          onClick={() => onEditar(ins)}
          style={{
            background: "none", border: "1.5px solid #e8dcc8",
            borderRadius: 8, padding: "4px 10px", cursor: "pointer",
            fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Editar
        </button>
      </div>
    </div>
  );
}


