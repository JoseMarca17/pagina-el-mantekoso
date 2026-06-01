"use client";

import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextInput({ label, id, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label
          htmlFor={id}
          className="text-[11px] font-bold text-(--color-navy) uppercase tracking-[0.5px]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full px-4 py-[13px] border-[1.5px] border-(--color-border) rounded-[14px] text-[13px] text-(--color-navy) bg-white outline-none focus:border-(--color-navy) placeholder:text-(--color-muted) font-sans transition-colors"
        {...props}
      />
    </div>
  );
}
