"use client";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "¿Qué postre buscas hoy?" }: SearchBarProps) {
  return (
    <div className="flex items-center gap-[10px] bg-white border border-(--color-border) rounded-[14px] px-4 py-[10px] mx-4 mb-5">
      <span className="text-[16px] text-(--color-muted)">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-none outline-none text-[13px] text-(--color-navy) bg-transparent placeholder:text-(--color-muted) font-sans"
      />
    </div>
  );
}
