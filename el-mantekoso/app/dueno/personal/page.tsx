"use client";
import { useState } from "react";

const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

const colores = ["#1a2744", "#c9a84c", "#27ae60", "#e74c3c", "#8e44ad", "#2980b9", "#e67e22"];

interface Empleado {
  id: number;
  iniciales: string;
  nombre: string;
  cargo: string;
  horario: string;
  conflicto: boolean;
  color: string;
}

const empleadosPorDia: Record<string, Empleado[]> = {
  L: [
    { id: 1, iniciales: "ML", nombre: "María L.",   cargo: "Cajera",    horario: "8:00–14:00",  conflicto: false, color: "#c9a84c" },
    { id: 2, iniciales: "JP", nombre: "Juan P.",    cargo: "Repostero", horario: "5:00–11:00",  conflicto: false, color: "#e74c3c" },
    { id: 3, iniciales: "RL", nombre: "Roberto L.", cargo: "Cajero",    horario: "14:00–20:00", conflicto: false, color: "#27ae60" },
  ],
  M: [
    { id: 1, iniciales: "ML", nombre: "María L.",   cargo: "Cajera",    horario: "8:00–14:00",  conflicto: false, color: "#c9a84c" },
    { id: 2, iniciales: "JP", nombre: "Juan P.",    cargo: "Repostero", horario: "5:00–11:00",  conflicto: false, color: "#e74c3c" },
    { id: 3, iniciales: "AC", nombre: "Ana C.",     cargo: "Cajera",    horario: "8:00–14:00",  conflicto: true,  color: "#8e44ad" },
    { id: 4, iniciales: "RL", nombre: "Roberto L.", cargo: "Cajero",    horario: "14:00–20:00", conflicto: false, color: "#27ae60" },
    { id: 5, iniciales: "SP", nombre: "Sofía P.",   cargo: "Ayudante",  horario: "8:00–14:00",  conflicto: false, color: "#2980b9" },
  ],
  X: [
    { id: 2, iniciales: "JP", nombre: "Juan P.",    cargo: "Repostero", horario: "5:00–11:00",  conflicto: false, color: "#e74c3c" },
    { id: 5, iniciales: "SP", nombre: "Sofía P.",   cargo: "Ayudante",  horario: "9:00–15:00",  conflicto: false, color: "#2980b9" },
    { id: 4, iniciales: "RL", nombre: "Roberto L.", cargo: "Cajero",    horario: "14:00–20:00", conflicto: false, color: "#27ae60" },
  ],
  J: [
    { id: 1, iniciales: "ML", nombre: "María L.",   cargo: "Cajera",    horario: "8:00–14:00",  conflicto: false, color: "#c9a84c" },
    { id: 3, iniciales: "AC", nombre: "Ana C.",     cargo: "Cajera",    horario: "14:00–20:00", conflicto: false, color: "#8e44ad" },
  ],
  V: [
    { id: 1, iniciales: "ML", nombre: "María L.",   cargo: "Cajera",    horario: "8:00–14:00",  conflicto: false, color: "#c9a84c" },
    { id: 2, iniciales: "JP", nombre: "Juan P.",    cargo: "Repostero", horario: "5:00–13:00",  conflicto: false, color: "#e74c3c" },
    { id: 5, iniciales: "SP", nombre: "Sofía P.",   cargo: "Ayudante",  horario: "10:00–16:00", conflicto: false, color: "#2980b9" },
    { id: 4, iniciales: "RL", nombre: "Roberto L.", cargo: "Cajero",    horario: "14:00–22:00", conflicto: false, color: "#27ae60" },
  ],
  S: [
    { id: 1, iniciales: "ML", nombre: "María L.",   cargo: "Cajera",    horario: "9:00–15:00",  conflicto: false, color: "#c9a84c" },
    { id: 3, iniciales: "AC", nombre: "Ana C.",     cargo: "Cajera",    horario: "9:00–15:00",  conflicto: false, color: "#8e44ad" },
    { id: 5, iniciales: "SP", nombre: "Sofía P.",   cargo: "Ayudante",  horario: "9:00–17:00",  conflicto: false, color: "#2980b9" },
  ],
  D: [
    { id: 2, iniciales: "JP", nombre: "Juan P.",    cargo: "Repostero", horario: "6:00–12:00",  conflicto: false, color: "#e74c3c" },
    { id: 4, iniciales: "RL", nombre: "Roberto L.", cargo: "Cajero",    horario: "10:00–18:00", conflicto: false, color: "#27ae60" },
  ],
};

export default function PersonalDueno() {
  const hoy = new Date().getDay(); // 0=dom
  const mapDia = [6, 0, 1, 2, 3, 4, 5]; // domingo=D (índice 6)
  const [diaActivo, setDiaActivo] = useState(diasSemana[mapDia[hoy]] ?? "M");
  const [modalOpen, setModalOpen] = useState(false);
  const [empleadoEditar, setEmpleadoEditar] = useState<Empleado | null>(null);

  const empleados = empleadosPorDia[diaActivo] ?? [];
  const conflictos = empleados.filter((e) => e.conflicto).length;

  return (
    <main className="page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="avatar">🧁</div>
          <div>
            <h1 className="page-title">Personal</h1>
            <p className="page-sub">Semana del 26 mayo</p>
          </div>
        </div>
        <button className="notif-btn">🔔</button>
      </header>

      {/* Selector días */}
      <div className="dias-row">
        {diasSemana.map((d) => {
          const emp = empleadosPorDia[d] ?? [];
          const tieneConflicto = emp.some((e) => e.conflicto);
          return (
            <button
              key={d}
              className={`dia-btn ${diaActivo === d ? "active" : ""}`}
              onClick={() => setDiaActivo(d)}
            >
              {d}
              {tieneConflicto && <span className="dia-dot" />}
            </button>
          );
        })}
      </div>

      {/* Resumen */}
      {conflictos > 0 && (
        <div className="aviso-conflicto">
          ⚠️ {conflictos} conflicto{conflictos > 1 ? "s" : ""} de horario este día
        </div>
      )}

      {/* Lista empleados */}
      <section className="section">
        {empleados.length === 0 ? (
          <p className="empty-msg">No hay personal asignado este día.</p>
        ) : (
          empleados.map((emp) => (
            <div key={emp.id} className="emp-card">
              <div
                className="emp-avatar"
                style={{ background: emp.color }}
              >
                {emp.iniciales}
              </div>
              <div className="emp-info">
                <p className="emp-nombre">{emp.nombre}</p>
                {emp.conflicto ? (
                  <p className="emp-conflicto">⚠️ Conflicto de horario</p>
                ) : (
                  <p className="emp-cargo">{emp.cargo} · {emp.horario}</p>
                )}
              </div>
              <button
                className="btn-editar"
                onClick={() => { setEmpleadoEditar(emp); setModalOpen(true); }}
              >
                ✏️ Editar
              </button>
            </div>
          ))
        )}
      </section>

      {/* Agregar empleado */}
      <div className="btn-wrap">
        <button className="btn-agregar" onClick={() => { setEmpleadoEditar(null); setModalOpen(true); }}>
          + Agregar turno
        </button>
      </div>

      {/* Stats de la semana */}
      <section className="section stats-row">
        <div className="stat-card">
          <p className="stat-val">5</p>
          <p className="stat-lbl">Empleados</p>
        </div>
        <div className="stat-card">
          <p className="stat-val">3</p>
          <p className="stat-lbl">Turnos hoy</p>
        </div>
        <div className="stat-card">
          <p className="stat-val" style={{ color: "#e74c3c" }}>1</p>
          <p className="stat-lbl">Conflictos</p>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <ModalEmpleado
          empleado={empleadoEditar}
          onClose={() => setModalOpen(false)}
        />
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

        .page-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #1a2744; margin: 0; }
        .page-sub { font-size: 12px; color: #888; margin: 0; }

        .notif-btn { background: none; border: none; font-size: 22px; cursor: pointer; }

        .dias-row {
          display: flex; gap: 6px; padding: 0 16px 12px;
          overflow-x: auto;
        }

        .dia-btn {
          width: 40px; height: 40px; border-radius: 12px;
          border: 1.5px solid #e8dcc8; background: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          font-weight: 600; color: #888; cursor: pointer;
          position: relative; transition: all 0.2s; flex-shrink: 0;
        }

        .dia-btn.active { background: #1a2744; color: #fff; border-color: #1a2744; }

        .dia-dot {
          position: absolute; top: 4px; right: 4px;
          width: 6px; height: 6px; border-radius: 50%; background: #e74c3c;
        }

        .aviso-conflicto {
          margin: 0 16px 10px;
          background: #fff0f0; border-left: 3px solid #e74c3c;
          border-radius: 10px; padding: 10px 14px;
          font-size: 13px; color: #c0392b; font-weight: 500;
        }

        .section { padding: 4px 16px; }

        .emp-card {
          display: flex; align-items: center; gap: 12px;
          background: #fff; border-radius: 14px; padding: 13px 14px;
          margin-bottom: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .emp-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
        }

        .emp-info { flex: 1; }
        .emp-nombre { font-size: 14px; font-weight: 700; color: #1a2744; margin: 0 0 2px; }
        .emp-cargo { font-size: 12px; color: #888; margin: 0; }
        .emp-conflicto { font-size: 12px; color: #e74c3c; margin: 0; font-weight: 600; }

        .btn-editar {
          background: #fdf6ec; border: 1.5px solid #e8dcc8;
          border-radius: 10px; padding: 6px 12px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 600; color: #1a2744; white-space: nowrap;
        }

        .btn-editar:hover { border-color: #1a2744; }

        .btn-wrap { padding: 8px 16px 12px; }

        .btn-agregar {
          width: 100%; background: #c9a84c; color: #fff;
          border: none; padding: 14px; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 600; cursor: pointer; transition: background 0.2s;
        }

        .btn-agregar:hover { background: #b8973f; }

        .stats-row {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;
          padding: 4px 16px 16px;
        }

        .stat-card {
          background: #fff; border-radius: 14px; padding: 14px 12px;
          text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .stat-val {
          font-family: 'Playfair Display', serif; font-size: 22px;
          color: #1a2744; margin: 0;
        }

        .stat-lbl { font-size: 11px; color: #aaa; margin: 2px 0 0; }

        .empty-msg { text-align: center; color: #bbb; font-size: 14px; padding: 24px 0; }
      `}</style>
    </main>
  );
}

function ModalEmpleado({
  empleado,
  onClose,
}: {
  empleado: Empleado | null;
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState(empleado?.nombre ?? "");
  const [cargo, setCargo] = useState(empleado?.cargo ?? "");
  const [horario, setHorario] = useState(empleado?.horario ?? "");

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">
          {empleado ? `Editar · ${empleado.nombre}` : "Agregar turno"}
        </h3>
        <label className="lbl">Nombre completo</label>
        <input className="inp" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: María L." />

        <label className="lbl">Cargo</label>
        <select className="inp" value={cargo} onChange={(e) => setCargo(e.target.value)}>
          <option value="">Seleccionar...</option>
          <option>Cajera</option>
          <option>Cajero</option>
          <option>Repostero</option>
          <option>Ayudante</option>
          <option>Repartidor</option>
        </select>

        <label className="lbl">Horario</label>
        <input className="inp" value={horario} onChange={(e) => setHorario(e.target.value)} placeholder="Ej: 8:00–14:00" />

        <div className="btns">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={onClose}>
            {empleado ? "Guardar cambios" : "Agregar"}
          </button>
        </div>

        <style jsx>{`
          .overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.5);
            display: flex; align-items: flex-end; justify-content: center; z-index: 200;
          }
          .modal {
            background: #fdf6ec; border-radius: 24px 24px 0 0;
            padding: 24px 20px 36px; width: 100%; max-width: 430px;
          }
          .modal-title {
            font-family: 'Playfair Display', serif; font-size: 18px;
            color: #1a2744; margin: 0 0 16px;
          }
          .lbl { font-size: 12px; color: #888; font-weight: 600;
            text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;
          }
          .inp {
            width: 100%; border: 1.5px solid #e8dcc8; border-radius: 10px;
            padding: 12px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px;
            background: #fff; color: #1a2744; outline: none; margin-bottom: 12px;
            box-sizing: border-box;
          }
          .inp:focus { border-color: #1a2744; }
          .btns { display: flex; gap: 10px; margin-top: 4px; }
          .btn-cancel {
            flex: 1; background: #f0e8d5; color: #1a2744; border: none;
            padding: 13px; border-radius: 10px; font-family: 'DM Sans', sans-serif;
            font-size: 14px; font-weight: 600; cursor: pointer;
          }
          .btn-save {
            flex: 1; background: #1a2744; color: #fff; border: none;
            padding: 13px; border-radius: 10px; font-family: 'DM Sans', sans-serif;
            font-size: 14px; font-weight: 600; cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
}

interface Empleado {
  id: number; iniciales: string; nombre: string;
  cargo: string; horario: string; conflicto: boolean; color: string;
}
