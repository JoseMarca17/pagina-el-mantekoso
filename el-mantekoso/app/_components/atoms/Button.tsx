"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "white" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  fullWidth = true,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "flex items-center justify-center rounded-[20px] px-5 py-4 text-sm font-bold transition-colors active:scale-[0.97] cursor-pointer border border-transparent font-sans";

  const variants: Record<Variant, string> = {
    primary: "bg-(--color-navy) text-white active:bg-(--color-gold)",
    secondary:
      "bg-transparent text-(--color-navy) border-(--color-border)",
    white: "bg-white text-(--color-navy)",
    ghost: "bg-transparent text-(--color-muted) border-(--color-border)",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
