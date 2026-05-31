"use client";
import { useState } from "react";

const topVentas = [
  { nombre: "Torta chocolate", unidades: 14, precio: 1190, pct: 88 },
  { nombre: "Cupcake vainilla", unidades: 11, precio: 330, pct: 62 },
  { nombre: "Pan mantequilla", unidades: 9, precio: 108, pct: 44 },
];

const pedidosPendientes = [
  { cliente: "Carmen R.", producto: "Torta fondant", hora: "18:00", urgente: true },
  { cliente: "Luis M.", producto: "Cupcakes x12", hora: "19:30", urgente: false },
];

export default function InicioDueno() {
  const [notifOpen, setNotifOpen] = useState(false);

  const fecha = new Date().toLocaleDateString("es-BO", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <main className="page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="avatar">🧁</div>
          <div>
            <p className="header-name">El Matekoso</p>
            <p className="header-role">Buenos días, dueño 👋</p>
          </div>
        </div>
        <button className="notif-btn" onClick={() => setNotifOpen(!notifOpen)}>
          🔔
          <span className="notif-badge">3</span>
        </button>
      </header>

      {/* Resumen del día */}
      <section className="hero-card">
        <p className="hero-date">{fecha} · Hoy</p>
        <h2 className="hero-monto">Bs. 1,240</h2>
        <p className="hero-stat">↑ 12% vs ayer · 23 pedidos</p>
      </section>

      {/* KPIs */}
      <section className="kpis">
        <div className="kpi-card">
          <span className="kpi-icon">💰</span>
          <p className="kpi-label">Ingresos</p>
          <p className="kpi-value">Bs. 1,240</p>
          <p className="kpi-change up">↑ 12% vs ayer</p>
        </div>
        <div className="kpi-card">
          <span className="kpi-icon">📦</span>
          <p className="kpi-label">Pedidos</p>
          <p className="kpi-value">23</p>
          <p className="kpi-change up">↑ 5 más</p>
        </div>
        <div className="kpi-card">
          <span className="kpi-icon">👥</span>
          <p className="kpi-label">Clientes</p>
          <p className="kpi-value">18</p>
          <p className="kpi-change neutral">= igual</p>
        </div>
        <div className="kpi-card">
          <span className="kpi-icon">⭐</span>
          <p className="kpi-label">Satisfac.</p>
          <p className="kpi-value">4.8</p>
          <p className="kpi-change up">↑ 0.2</p>
        </div>
      </section>

      {/* Top ventas */}
      <section className="section">
        <h3 className="section-title">🏆 TOP VENTAS HOY</h3>
        {topVentas.map((v) => (
          <div key={v.nombre} className="venta-row">
            <div className="venta-info">
              <p className="venta-nombre">{v.nombre}</p>
              <p className="venta-und">{v.unidades} und</p>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${v.pct}%` }} />
              </div>
            </div>
            <span className="venta-precio">Bs.{v.precio.toLocaleString()}</span>
          </div>
        ))}
      </section>

      {/* Pedidos pendientes */}
      <section className="section">
        <h3 className="section-title">⏳ PEDIDOS PENDIENTES</h3>
        {pedidosPendientes.map((p) => (
          <div key={p.cliente} className="pedido-card">
            <div>
              <div className="pedido-header">
                <p className="pedido-prod">{p.producto} · <span className="pedido-cliente">{p.cliente}</span></p>
                {p.urgente && <span className="badge-urgente">Urgente</span>}
              </div>
              <p className="pedido-hora">Para hoy {p.hora} · Personalizada</p>
            </div>
          </div>
        ))}
        <button className="link-btn">Ver todos los pedidos →</button>
      </section>

      {/* Acceso rápido */}
      <section className="quick-access">
        <h3 className="section-title">⚡ ACCESO RÁPIDO</h3>
        <div className="quick-grid">
          {[
            { href: "/dueno/alertas",   icon: "🔔", label: "Alertas",  color: "#fff0f0" },
            { href: "/dueno/reportes",  icon: "📊", label: "Reportes", color: "#f0f4ff" },
            { href: "/dueno/personal",  icon: "👥", label: "Personal", color: "#f0fff4" },
            { href: "/dueno/config",    icon: "⚙️",  label: "Config",   color: "#fffbf0" },
          ].map((q) => (
            <a key={q.href} href={q.href} className="quick-btn" style={{ background: q.color }}>
              <span style={{ fontSize: 24 }}>{q.icon}</span>
              <span className="quick-label">{q.label}</span>
            </a>
          ))}
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .page {
          min-height: 100vh;
          background: #fdf6ec;
          font-family: 'DM Sans', sans-serif;
          max-width: 430px;
          margin: 0 auto;
          padding-bottom: 90px;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 12px;
        }

        .header-left { display: flex; align-items: center; gap: 12px; }

        .avatar {
          width: 44px; height: 44px;
          background: #1a2744;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }

        .header-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px; color: #1a2744; margin: 0; font-weight: 700;
        }

        .header-role { font-size: 12px; color: #888; margin: 0; }

        .notif-btn {
          position: relative; background: none; border: none;
          font-size: 22px; cursor: pointer;
        }

        .notif-badge {
          position: absolute; top: -2px; right: -4px;
          background: #e74c3c; color: #fff;
          font-size: 10px; font-weight: 700;
          width: 16px; height: 16px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .hero-card {
          margin: 0 16px 16px;
          background: #1a2744;
          border-radius: 20px;
          padding: 20px 24px;
          color: #fff;
        }

        .hero-date { font-size: 12px; color: rgba(255,255,255,0.55); margin: 0 0 4px; text-transform: capitalize; }
        .hero-monto { font-family: 'Playfair Display', serif; font-size: 36px; margin: 0; letter-spacing: -1px; }
        .hero-stat { font-size: 13px; color: #c9a84c; margin: 6px 0 0; font-weight: 500; }

        .kpis {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; padding: 0 16px 8px;
        }

        .kpi-card {
          background: #fff;
          border-radius: 16px;
          padding: 14px 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .kpi-icon { font-size: 18px; }
        .kpi-label { font-size: 11px; color: #aaa; margin: 4px 0 2px; text-transform: uppercase; letter-spacing: 0.5px; }
        .kpi-value { font-family: 'Playfair Display', serif; font-size: 22px; color: #1a2744; margin: 0; }
        .kpi-change { font-size: 11px; margin: 2px 0 0; font-weight: 500; }
        .kpi-change.up { color: #27ae60; }
        .kpi-change.neutral { color: #888; }

        .section { padding: 8px 16px 4px; }

        .section-title {
          font-size: 11px; font-weight: 700;
          color: #aaa; letter-spacing: 1px;
          text-transform: uppercase; margin: 0 0 10px;
        }

        .venta-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border-radius: 14px; padding: 12px 14px;
          margin-bottom: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .venta-info { flex: 1; }
        .venta-nombre { font-size: 14px; font-weight: 600; color: #1a2744; margin: 0 0 2px; }
        .venta-und { font-size: 12px; color: #888; margin: 0 0 6px; }

        .bar-track {
          width: 100%; height: 5px; background: #f0e8d5; border-radius: 10px;
        }

        .bar-fill {
          height: 100%; background: #c9a84c; border-radius: 10px;
          transition: width 0.8s ease;
        }

        .venta-precio { font-size: 14px; font-weight: 700; color: #c9a84c; margin-left: 16px; white-space: nowrap; }

        .pedido-card {
          background: #fff; border-radius: 14px;
          padding: 14px; margin-bottom: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .pedido-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .pedido-prod { font-size: 14px; font-weight: 600; color: #1a2744; margin: 0; }
        .pedido-cliente { color: #c9a84c; }
        .pedido-hora { font-size: 12px; color: #888; margin: 0; }

        .badge-urgente {
          background: #e74c3c; color: #fff;
          font-size: 11px; font-weight: 700;
          padding: 2px 8px; border-radius: 20px;
        }

        .link-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #c9a84c;
          font-weight: 600; padding: 4px 0;
        }

        .quick-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .quick-btn {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; padding: 16px 12px;
          border-radius: 16px; text-decoration: none;
          transition: transform 0.15s;
        }

        .quick-btn:active { transform: scale(0.96); }

        .quick-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600; color: #1a2744;
        }
      `}</style>
    </main>
  );
}
