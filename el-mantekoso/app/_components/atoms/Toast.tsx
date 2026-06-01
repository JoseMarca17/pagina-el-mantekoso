"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface ToastCtx {
  show: (msg: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  const show = useCallback((m: string) => {
    setMsg(m);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        className={`fixed top-[60px] left-1/2 -translate-x-1/2 bg-(--color-navy) text-white text-[12px] font-semibold px-5 py-[10px] rounded-[20px] pointer-events-none z-[999] whitespace-nowrap transition-all duration-300 ${
          visible ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
