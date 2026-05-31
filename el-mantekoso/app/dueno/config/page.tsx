"use client";
import { useState } from "react";

interface Permiso {
  label: string;
  activo: boolean;
}

interface Rol {
  id: number;
  iniciales: string;
  nombre: string;
  descripcion: string;
  color: string;
  esDueno: boolean;
  permisos: Record<string, Permiso>;
}

const rolesIniciales: Rol[] = [
  {
    id: 1,
    iniciales: "D",
    nombre: "Dueño (tú)",
    descripcion: "Todo el sistema · Sin restricciones",
    color: "#c9a84c",
    esDueno: true,
    permisos: {
      ventas:    { label: "Ventas",    activo: true },
      reportes:  { label: "Reportes",  activo: true },
      config:    { label: "Config",    activo: true },
      personal:  { label: "Personal",  activo: true },
      pedidos:   { label: "Pedidos",   activo: true },
      gastos:    { label: "Gastos",    activo: true },
    },
  },
  {
    id: 2,
    iniciales: "C",
    nombre: "Cajero",
    descripcion: "Acceso a ventas del día",
    color: "#2980b9",
    esDueno: false,
    permisos: {
      ventas:    { label: "Ventas",    activo: true },
      reportes:  { label: "Reportes",  activo: false },
      config:    { label: "Config",    activo: false },
      personal:  { label: "Personal",  activo: false },
      pedidos:   { label: "Pedidos",   activo: false },
      gastos:    { label: "Gastos",    activo: false },
    },
  },
  {
    id: 3,
    iniciales: "R",
    nombre: "Repostero",
    descripcion: "Producción y catálogo de productos",
    color: "#e67e22",
    esDueno: false,
    permisos: {
      ventas:    { label: "Ventas",    activo: false },
      reportes:  { label: "Reportes",  activo: false },
      config:    { label: "Config",    activo: false },
      personal:  { label: "Personal",  activo: false },
      pedidos:   { label: "Pedidos",   activo: true },
      gastos:    { label: "Gastos",    activo: false },
    },
  },
  {
    id: 4,
    iniciales: "E",
    nombre: "Repartidor",
    descripcion: "Entregas y seguimiento de pedidos",
    color: "#8e44ad",
    esDueno: false,
    permisos: {
      ventas:    { label: "Ventas",    activo: false },
      reportes:  { label: "Reportes",  activo: false },
      config:    { label: "Config",    activo: false },
      personal:  { label: "Personal",  activo: false },
      pedidos:   { label: "Pedidos",   activo: true },
      gastos:    { label: "Gastos",    activo: false },
    },
  },
];

export default function ConfigDueno() {
  const [roles, setRoles] = useState(rolesIniciales);
  const [rolEditando, setRolEditando] = useState<Rol | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  const togglePermiso = (rolId: number, key: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === rolId
          ? { ...r, permisos: { ...r.permisos, [key]: { ...r.permisos[key], activo: !r.permisos[key].activo } } }
          : r
      )
    );
  };

  const abrirEditar = (rol: Rol) => {
    setRolEditando(rol);
    setModalOpen(true);
  };

  return (
    <main className="page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="avatar">🧁</div>
          <div>
            <h1 className="page-title">Accesos</h1>
            <p className="page-sub">Solo tú puedes cambiar esto</p>
          </div>
        </div>
        <button className="notif-btn">🔔</button>
      </header>

      {/* Banner permisos */}
      <div className="banner-permisos" onClick={() => setLogOpen(true)}>
        <span>🔒 Permisos del sistema</span>
        <span className="banner-link">Historial de accesos · Ver quién entró →</span>
      </div>

      {/* Sección roles */}
      <section className="section">
        <h3 className="section-title">ROLES Y PERMISOS</h3>

        {roles.map((rol) => (
          <div key={rol.id} className={`rol-card ${rol.esDueno ? "dueno-card" : ""}`}>
            {/* Header rol */}
            <div className="rol-header">
              <div
                className="rol-avatar"
                style={{ background: rol.esDueno ? "#c9a84c22" : "#f0f0f0", border: rol.esDueno ? "2px solid #c9a84c" : "none" }}
              >
                <span style={{ fontSize: 20 }}>
                  {rol.id === 1 ? "🔥" : rol.iniciales}
                </span>
              </div>
              <div className="rol-info">
                <div className="rol-nombre-row">
                  <p className="rol-nombre">{rol.nombre}</p>
                  {rol.esDueno && <span className="badge-admin">Admin</span>}
                </div>
                <p className="rol-desc">{rol.descripcion}</p>
              </div>
              {!rol.esDueno && (
                <button className="btn-editar" onClick={() => abrirEditar(rol)}>
                  ✏️ Editar
                </button>
              )}
            </div>

            {/* Permisos */}
            <div className="permisos-row">
              {Object.entries(rol.permisos).map(([key, p]) => (
                <button
                  key={key}
                  className={`permiso-chip ${p.activo ? "on" : "off"}`}
                  onClick={() => !rol.esDueno && togglePermiso(rol.id, key)}
                  disabled={rol.esDueno}
                >
                  {p.label} {p.activo ? "✅" : "❌"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Agregar usuario */}
      <div className="btn-wrap">
        <button className="btn-agregar">+ Agregar usuario</button>
      </div>

      {/* Modal editar rol */}
      {modalOpen && rolEditando && (
        <div className="overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Permisos · {rolEditando.nombre}</h3>
            <p className="modal-sub">Activa o desactiva accesos para este rol.</p>
            <div className="modal-permisos">
              {Object.entries(rolEditando.permisos).map(([key, p]) => (
                <div key={key} className="modal-perm-row">
                  <span className="modal-perm-label">{p.label}</span>
                  <button
                    className={`toggle-btn ${p.activo ? "on" : ""}`}
                    onClick={() => togglePermiso(rolEditando.id, key)}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-cerrar" onClick={() => setModalOpen(false)}>
              Listo
            </button>
          </div>
        </div>
      )}

      {/* Modal historial */}
      {logOpen && (
        <div className="overlay" onClick={() => setLogOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">📋 Historial de accesos</h3>
            {[
              { hora: "Hoy 08:14", usuario: "María L.",  accion: "Inicio de sesión · Cajera" },
              { hora: "Hoy 07:58", usuario: "Juan P.",   accion: "Inicio de sesión · Repostero" },
              { hora: "Hoy 06:30", usuario: "Juan P.",   accion: "Accedió a Pedidos" },
              { hora: "Ayer 20:10",usuario: "Roberto L.",accion: "Cierre de caja · Cajero" },
              { hora: "Ayer 14:00",usuario: "María L.",  accion: "Cierre de turno" },
            ].map((log, i) => (
              <div key={i} className="log-row">
                <div>
                  <p className="log-usuario">{log.usuario}</p>
                  <p className="log-accion">{log.accion}</p>
                </div>
                <span className="log-hora">{log.hora}</span>
              </div>
            ))}
            <button className="btn-cerrar" onClick={() => setLogOpen(false)} style={{ marginTop: 16 }}>
              Cerrar
            </button>
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

        .page-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #1a2744; margin: 0; }
        .page-sub { font-size: 12px; color: #888; margin: 0; }

        .notif-btn { background: none; border: none; font-size: 22px; cursor: pointer; }

        .banner-permisos {
          margin: 0 16px 12px;
          background: #1a2744; border-radius: 14px; padding: 12px 16px;
          display: flex; flex-direction: column; gap: 2px; cursor: pointer;
        }

        .banner-permisos span:first-child {
          font-size: 14px; color: #fff; font-weight: 600;
        }

        .banner-link {
          font-size: 12px; color: #c9a84c; font-weight: 500;
        }

        .section { padding: 4px 16px; }

        .section-title {
          font-size: 11px; font-weight: 700; color: #aaa;
          letter-spacing: 1px; text-transform: uppercase; margin: 12px 0 10px;
        }

        .rol-card {
          background: #fff; border-radius: 16px; padding: 14px;
          margin-bottom: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .dueno-card { background: #fffbf0; border: 1.5px solid #c9a84c33; }

        .rol-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 10px;
        }

        .rol-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; flex-shrink: 0;
        }

        .rol-info { flex: 1; }

        .rol-nombre-row { display: flex; align-items: center; gap: 8px; }

        .rol-nombre { font-size: 15px; font-weight: 700; color: #1a2744; margin: 0; }

        .badge-admin {
          background: #1a2744; color: #c9a84c;
          font-size: 10px; font-weight: 700; padding: 2px 8px;
          border-radius: 20px; letter-spacing: 0.5px;
        }

        .rol-desc { font-size: 12px; color: #888; margin: 2px 0 0; }

        .btn-editar {
          background: #fdf6ec; border: 1.5px solid #e8dcc8;
          border-radius: 10px; padding: 6px 12px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 600; color: #1a2744; white-space: nowrap;
        }

        .btn-editar:hover { border-color: #1a2744; }

        .permisos-row { display: flex; flex-wrap: wrap; gap: 6px; }

        .permiso-chip {
          padding: 4px 10px; border-radius: 20px; font-size: 11px;
          font-weight: 600; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.15s;
        }

        .permiso-chip.on  { background: #e8f5e9; color: #27ae60; }
        .permiso-chip.off { background: #ffeaea; color: #e74c3c; }
        .permiso-chip:disabled { cursor: default; opacity: 0.9; }

        .btn-wrap { padding: 8px 16px 12px; }

        .btn-agregar {
          width: 100%; background: #1a2744; color: #fff;
          border: none; padding: 15px; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 600; cursor: pointer; transition: background 0.2s;
        }

        .btn-agregar:hover { background: #243460; }

        .overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: flex-end; justify-content: center; z-index: 200;
        }

        .modal {
          background: #fdf6ec; border-radius: 24px 24px 0 0;
          padding: 24px 20px 36px; width: 100%; max-width: 430px;
          max-height: 80vh; overflow-y: auto;
        }

        .modal-title {
          font-family: 'Playfair Display', serif; font-size: 18px;
          color: #1a2744; margin: 0 0 6px;
        }

        .modal-sub { font-size: 13px; color: #888; margin: 0 0 16px; }

        .modal-permisos { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }

        .modal-perm-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border-radius: 10px; padding: 12px 14px;
        }

        .modal-perm-label { font-size: 14px; font-weight: 600; color: #1a2744; }

        .toggle-btn {
          width: 44px; height: 24px; border-radius: 12px;
          background: #ddd; border: none; cursor: pointer;
          position: relative; transition: background 0.2s;
        }

        .toggle-btn.on { background: #1a2744; }

        .toggle-knob {
          position: absolute; top: 3px; left: 3px;
          width: 18px; height: 18px; background: #fff;
          border-radius: 50%; transition: left 0.2s; display: block;
        }

        .toggle-btn.on .toggle-knob { left: 23px; }

        .btn-cerrar {
          width: 100%; background: #1a2744; color: #fff;
          border: none; padding: 14px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 600; cursor: pointer;
        }

        .log-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border-radius: 10px; padding: 10px 12px; margin-bottom: 6px;
        }

        .log-usuario { font-size: 14px; font-weight: 600; color: #1a2744; margin: 0; }
        .log-accion { font-size: 12px; color: #888; margin: 2px 0 0; }
        .log-hora { font-size: 11px; color: #aaa; white-space: nowrap; }
      `}</style>
    </main>
  );
}
