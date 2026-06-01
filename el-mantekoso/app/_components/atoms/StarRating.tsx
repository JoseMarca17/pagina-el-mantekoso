"use client";

import { useState } from "react";

interface StarRatingProps {
  value?: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}

export default function StarRating({
  value = 0,
  onChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  const sizeClass = size === "sm" ? "text-[12px]" : "text-[22px]";

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`${sizeClass} cursor-pointer transition-transform active:scale-125 ${
            n <= active ? "text-(--color-gold-2)" : "text-[#ddd]"
          } ${readonly ? "cursor-default" : ""}`}
          onMouseEnter={() => !readonly && setHovered(n)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onClick={() => !readonly && onChange?.(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
