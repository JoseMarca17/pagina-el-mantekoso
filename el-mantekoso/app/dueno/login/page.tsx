"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginDueno() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulación de autenticación — reemplaza con tu lógica real
    setTimeout(() => {
      if (correo === "dueno@elmantekoso.com" && password === "1234") {
        router.push("/dueno/inicio");
      } else {
        setError("Correo o contraseña incorrectos");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <main className="login-root">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-wrap">
          <span className="logo-icon">🧁</span>
        </div>
        <h1 className="brand-name">El Matekoso</h1>
        <p className="brand-sub">Panel del Dueño</p>

        <div className="form-card">
          <h2 className="form-title">Bienvenido de vuelta</h2>
          <p className="form-sub">Ingresa tus credenciales</p>

          <form onSubmit={handleLogin} className="form">
            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="correo@elmantekoso.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="input"
              />
            </div>

            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="toggle-pass"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            {error && <p className="error-msg">⚠️ {error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar al panel"}
            </button>

            <button type="button" className="btn-huella">
              🔑 Iniciar con huella digital
            </button>

            <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
          </form>
        </div>

        <p className="footer-note">Solo el dueño tiene acceso a este panel</p>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .login-root {
          min-height: 100vh;
          background: #1a2744;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .logo-wrap {
          width: 72px;
          height: 72px;
          background: #fdf6ec;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          margin-bottom: 4px;
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          color: #fff;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .brand-sub {
          font-size: 13px;
          color: #c9a84c;
          margin: 0 0 16px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .form-card {
          width: 100%;
          background: #fdf6ec;
          border-radius: 24px;
          padding: 28px 24px 20px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #1a2744;
          margin: 0 0 4px;
          text-align: center;
        }

        .form-sub {
          font-size: 13px;
          color: #888;
          text-align: center;
          margin: 0 0 20px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #e8dcc8;
          border-radius: 12px;
          transition: border-color 0.2s;
        }

        .input-wrap:focus-within {
          border-color: #1a2744;
        }

        .input-icon {
          padding: 0 10px 0 14px;
          font-size: 15px;
          pointer-events: none;
        }

        .input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 13px 12px 13px 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a2744;
          outline: none;
        }

        .input::placeholder { color: #bbb; }

        .toggle-pass {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 14px;
          font-size: 15px;
        }

        .error-msg {
          font-size: 13px;
          color: #e74c3c;
          background: #ffeaea;
          padding: 8px 12px;
          border-radius: 8px;
          margin: 0;
          text-align: center;
        }

        .btn-primary {
          background: #1a2744;
          color: #fff;
          border: none;
          padding: 15px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          margin-top: 4px;
        }

        .btn-primary:hover { background: #243460; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-huella {
          background: #fff8ed;
          color: #1a2744;
          border: 1.5px dashed #c9a84c;
          padding: 13px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-huella:hover { background: #fdf0d8; }

        .forgot-link {
          text-align: center;
          font-size: 13px;
          color: #c9a84c;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-link:hover { text-decoration: underline; }

        .footer-note {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-top: 8px;
          text-align: center;
        }
      `}</style>
    </main>
  );
}
