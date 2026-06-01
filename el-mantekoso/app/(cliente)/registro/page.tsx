"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/app/_components/atoms/TextInput";
import Button from "@/app/_components/atoms/Button";
import { useToast } from "@/app/_components/atoms/Toast";

export default function RegistroPage() {
  const router = useRouter();
  const toast = useToast();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function submit() {
    if (!form.email || !form.password) {
      toast.show("Completa los campos");
      return;
    }

    if (mode === "login") {
      // CASO 1: GERENTE DE INVENTARIO
      if (form.email === "gerente_inventario@gmail.com" && form.password === "12345678") {
        toast.show("Acceso de Gerente autorizado 🛠️");
        setTimeout(() => router.push("/encargado_inventario"), 800);
      } 
      // CASO 2: CONSUMIDOR
      else if (form.email === "consumidor@gmail.com" && form.password === "12345678") {
        toast.show("Bienvenido de vuelta 👋");
        setTimeout(() => router.push("/inicio"), 800);
      }
      // CASO 3: CUALQUIER OTRO DATO (ERROR)
      else {
        toast.show("Credenciales no reconocidas en el prototipo");
      }
    } else {
      // REGISTRO (POR DEFECTO A INICIO)
      toast.show("Cuenta creada ✓");
      setTimeout(() => router.push("/inicio"), 800);
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header decorativo */}
      <div className="bg-(--color-navy) px-6 pt-14 pb-10 text-center">
        <div className="text-[38px] mb-2">🧁</div>
        <div className="font-display text-[26px] font-bold text-white">El Mantekoso</div>
        <p className="text-[12px] text-white/60 mt-1">Pastelería Artesanal · La Paz</p>
      </div>

      {/* Tabs */}
      <div className="flex mx-6 mt-[-1px] bg-white rounded-b-[0] border-b-0">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            className={`flex-1 py-[14px] text-[13px] font-bold transition-colors border-b-[2.5px] ${
              mode === m
                ? "text-(--color-navy) border-(--color-navy)"
                : "text-(--color-muted) border-transparent"
            }`}
            onClick={() => setMode(m)}
          >
            {m === "login" ? "Ingresar" : "Registrarse"}
          </button>
        ))}
      </div>

      <div className="flex-1 px-6 pt-6 pb-8 flex flex-col gap-4">
        {mode === "register" && (
          <TextInput
            label="Nombre completo"
            id="name"
            placeholder="Ej: María García"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        )}
        <TextInput
          label="Correo electrónico"
          id="email"
          type="email"
          placeholder="tu@correo.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
        <TextInput
          label="Contraseña"
          id="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
        />

        {mode === "login" && (
          <button className="text-[11px] text-(--color-gold) font-semibold self-end">
            ¿Olvidaste tu contraseña?
          </button>
        )}

        <div className="mt-2">
          <Button variant="primary" onClick={submit}>
            {mode === "login" ? "Ingresar" : "Crear cuenta"}
          </Button>
        </div>

        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-(--color-border)" />
          <span className="text-[10px] text-(--color-muted)">o continúa con</span>
          <div className="flex-1 h-px bg-(--color-border)" />
        </div>

        <button className="flex items-center justify-center gap-[10px] bg-white border border-(--color-border) rounded-[14px] py-[13px] text-[13px] font-semibold text-(--color-navy)">
          <span className="text-[18px]">G</span>
          Google
        </button>

        <p className="text-[11px] text-center text-(--color-muted) mt-2">
          Al continuar aceptas nuestros{" "}
          <span className="text-(--color-navy) font-semibold">Términos y Condiciones</span>
        </p>
      </div>
    </div>
  );
}