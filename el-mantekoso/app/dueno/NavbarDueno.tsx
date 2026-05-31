"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/dueno/inicio",    icon: "🏠", label: "Inicio" },
  { href: "/dueno/alertas",   icon: "🔔", label: "Alertas" },
  { href: "/dueno/reportes",  icon: "📊", label: "Reportes" },
  { href: "/dueno/personal",  icon: "👥", label: "Personal" },
  { href: "/dueno/config",    icon: "⚙️",  label: "Config" },
];

export default function NavbarDueno() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} className={`nav-item ${active ? "active" : ""}`}>
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
            {active && <span className="nav-dot" />}
          </Link>
        );
      })}

      <style jsx>{`
        .navbar {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 430px;
          background: #fdf6ec;
          border-top: 1.5px solid #ecdfc8;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 8px 0 env(safe-area-inset-bottom, 8px);
          z-index: 100;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          text-decoration: none;
          padding: 4px 12px;
          position: relative;
        }

        .nav-icon { font-size: 22px; line-height: 1; }

        .nav-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: #aaa;
          transition: color 0.2s;
        }

        .nav-item.active .nav-label { color: #1a2744; font-weight: 600; }

        .nav-dot {
          position: absolute;
          bottom: -4px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c9a84c;
        }
      `}</style>
    </nav>
  );
}
