"use client";
import { useState } from "react";

const semanas = ["Esta semana", "Semana pasada", "Último mes"];

const masVendidos = [
  { nombre: "Torta chocolate",  und: 89, pct: 100, emoji: "🎂" },
  { nombre: "Cupcake vainilla", und: 74, pct: 83,  emoji: "🧁" },
  { nombre: "Pan mantequilla",  und: 56, pct: 63,  emoji: "🍞" },
  { nombre: "Torta tres leches",und: 28, pct: 31,  emoji: "🍰" },
];

const menosVendidos = [
  { nombre: "Milhojas",  und: 4,  sugerencia: "Producir menos → ahorra insumos", emoji: "🥐" },
  { nombre: "Croissant", und: 6,  sugerencia: "Considera combo o descuento",     emoji: "🥐" },
];

const dias = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const ventasDia = [820, 1240, 980, 1560, 1100, 2100, 1800];
const maxVenta = Math.max(...ventasDia);

export default function ReportesDueno() {
  const [semana, setSemana] = useState(0);
  const [reporteAuto, setReporteAuto] = useState(true);

  const total = semana === 0 ? 8430 : semana === 1 ? 7140 : 31200;
  const pedidos = semana === 0 ? 247 : semana === 1 ? 210 : 890;
  const cambio = semana === 0 ? "+18%" : semana === 1 ? "+5%" : "+22%";

  return (
    <main className="page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="avatar">🧁</div>
          <div>
            <h1 className="page-title">Reportes</h1>
            <p className="page-sub">Semana 20–26 mayo</p>
          </div>
        </div>
        <button className="notif-btn">🔔</button>
      </header>

      {/* Selector de semana */}
      <div className="tabs-wrap">
        {semanas.map((s, i) => (
          <button
            key={s}
            className={`tab-btn ${semana === i ? "active" : ""}`}
            onClick={() => setSemana(i)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Hero */}
      <section className="hero-card">
        <p className="hero-label">Ventas totales semana</p>
        <h2 className="hero-monto">Bs. {total.toLocaleString()}</h2>
        <p className="hero-stat">{cambio} vs semana anterior · {pedidos} pedidos</p>
      </section>

      {/* Gráfico de barras */}
      <section className="section">
        <h3 className="section-title">📈 VENTAS POR DÍA</h3>
        <div className="chart-card">
          <div className="chart-bars">
            {dias.map((d, i) => (
              <div key={d} className="bar-col">
                <span className="bar-value">
                  {(ventasDia[i] / 1000).toFixed(1)}k
                </span>
                <div
                  className="bar-body"
                  style={{ height: `${(ventasDia[i] / maxVenta) * 100}%` }}
                />
                <span className="bar-dia">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Más vendidos */}
      <section className="section">
        <h3 className="section-title">🏆 MÁS VENDIDOS</h3>
        {masVendidos.map((p) => (
          <div key={p.nombre} className="prod-row">
            <span className="prod-emoji">{p.emoji}</span>
            <div className="prod-info">
              <div className="prod-header">
                <p className="prod-nombre">{p.nombre}</p>
                <span className="prod-und">{p.und} und</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${p.pct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Menos vendidos */}
      <section className="section">
        <h3 className="section-title">📉 MENOS VENDIDOS · Reducir</h3>
        {menosVendidos.map((p) => (
          <div key={p.nombre} className="menos-card">
            <div className="menos-header">
              <span className="prod-emoji">{p.emoji}</span>
              <p className="prod-nombre">{p.nombre}</p>
              <span className="menos-und">{p.und} und</span>
            </div>
            <p className="menos-sug">{p.sugerencia}</p>
          </div>
        ))}
      </section>

      {/* Reporte automático */}
      <section className="section">
        <div className="reporte-auto-card">
          <div className="reporte-auto-left">
            <span style={{ fontSize: 18 }}>📧</span>
            <div>
              <p className="reporte-auto-title">Reporte automático</p>
              <p className="reporte-auto-sub">Cada lunes a tu correo</p>
            </div>
          </div>
          <button
            className={`toggle-btn ${reporteAuto ? "on" : ""}`}
            onClick={() => setReporteAuto(!reporteAuto)}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </section>

      {/* Exportar */}
      <div className="btn-wrap">
        <button className="btn-export">📥 Exportar reporte PDF</button>
      </div>

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
          font-family: 'Playfair Display', serif; font-size: 20px; color: #1a2744; margin: 0;
        }

        .page-sub { font-size: 12px; color: #888; margin: 0; }

        .notif-btn { background: none; border: none; font-size: 22px; cursor: pointer; }

        .tabs-wrap {
          display: flex; gap: 8px; padding: 0 16px 12px; overflow-x: auto;
        }

        .tab-btn {
          padding: 7px 16px; border-radius: 20px; border: 1.5px solid #e8dcc8;
          background: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #888; cursor: pointer;
          white-space: nowrap; transition: all 0.2s;
        }

        .tab-btn.active {
          background: #1a2744; color: #fff; border-color: #1a2744;
        }

        .hero-card {
          margin: 0 16px 16px; background: #1a2744;
          border-radius: 20px; padding: 20px 24px; color: #fff;
        }

        .hero-label { font-size: 12px; color: rgba(255,255,255,0.55); margin: 0 0 4px; }
        .hero-monto { font-family: 'Playfair Display', serif; font-size: 36px; margin: 0; letter-spacing: -1px; }
        .hero-stat { font-size: 13px; color: #c9a84c; margin: 6px 0 0; font-weight: 500; }

        .section { padding: 4px 16px 4px; }

        .section-title {
          font-size: 11px; font-weight: 700; color: #aaa;
          letter-spacing: 1px; text-transform: uppercase; margin: 12px 0 10px;
        }

        .chart-card {
          background: #fff; border-radius: 16px; padding: 16px 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 8px;
        }

        .chart-bars {
          display: flex; align-items: flex-end; gap: 6px; height: 100px;
        }

        .bar-col {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; height: 100%; justify-content: flex-end; gap: 4px;
        }

        .bar-value { font-size: 9px; color: #888; font-weight: 600; }

        .bar-body {
          width: 100%; background: linear-gradient(180deg, #c9a84c, #e8c47a);
          border-radius: 6px 6px 0 0; min-height: 4px;
          transition: height 0.8s ease;
        }

        .bar-dia { font-size: 10px; color: #888; font-weight: 600; }

        .prod-row {
          display: flex; align-items: center; gap: 12px;
          background: #fff; border-radius: 14px; padding: 12px 14px;
          margin-bottom: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .prod-emoji { font-size: 22px; }
        .prod-info { flex: 1; }

        .prod-header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;
        }

        .prod-nombre { font-size: 14px; font-weight: 600; color: #1a2744; margin: 0; }
        .prod-und { font-size: 14px; font-weight: 700; color: #c9a84c; }

        .bar-track { width: 100%; height: 5px; background: #f0e8d5; border-radius: 10px; }

        .bar-fill {
          height: 100%; background: #c9a84c; border-radius: 10px;
          transition: width 0.8s ease;
        }

        .menos-card {
          background: #fff8f0; border-left: 3px solid #e67e22;
          border-radius: 12px; padding: 12px 14px; margin-bottom: 8px;
        }

        .menos-header {
          display: flex; align-items: center; gap: 10px; margin-bottom: 4px;
        }

        .menos-und { font-size: 14px; font-weight: 700; color: #e74c3c; margin-left: auto; }
        .menos-sug { font-size: 12px; color: #e67e22; margin: 0; font-weight: 500; }

        .reporte-auto-card {
          background: #fff8ed; border: 1.5px dashed #c9a84c;
          border-radius: 14px; padding: 14px 16px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .reporte-auto-left { display: flex; align-items: center; gap: 12px; }
        .reporte-auto-title { font-size: 14px; font-weight: 600; color: #1a2744; margin: 0; }
        .reporte-auto-sub { font-size: 12px; color: #888; margin: 0; }

        .toggle-btn {
          width: 44px; height: 24px; border-radius: 12px;
          background: #ddd; border: none; cursor: pointer;
          position: relative; transition: background 0.2s;
        }

        .toggle-btn.on { background: #1a2744; }

        .toggle-knob {
          position: absolute; top: 3px; left: 3px;
          width: 18px; height: 18px; background: #fff;
          border-radius: 50%; transition: left 0.2s;
          display: block;
        }

        .toggle-btn.on .toggle-knob { left: 23px; }

        .btn-wrap { padding: 12px 16px; }

        .btn-export {
          width: 100%; background: #c9a84c; color: #fff;
          border: none; padding: 15px; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 600; cursor: pointer; transition: background 0.2s;
        }

        .btn-export:hover { background: #b8973f; }
      `}</style>
    </main>
  );
}
