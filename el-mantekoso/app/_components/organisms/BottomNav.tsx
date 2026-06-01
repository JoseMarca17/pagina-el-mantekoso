"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/inicio", icon: "🏠", label: "Inicio" },
  { href: "/vitrina", icon: "🛍", label: "Vitrina" },
  { href: "/nosotros", icon: "♡", label: "Nosotros" },
  { href: "/cuenta", icon: "👤", label: "Cuenta" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 flex justify-around items-center px-2 pt-3 pb-6 bg-white border-t border-(--color-border) z-50">
      {items.map(({ href, icon, label }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-[3px] cursor-pointer"
          >
            <span className="text-[20px] leading-none">{icon}</span>
            <span
              className={`text-[9px] uppercase tracking-[0.5px] ${
                active ? "text-(--color-navy) font-bold" : "text-(--color-muted) font-medium"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
