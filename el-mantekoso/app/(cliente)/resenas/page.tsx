"use client";

import { useState } from "react";
import ReviewCard from "@/app/_components/molecules/ReviewCard";
import StarRating from "@/app/_components/atoms/StarRating";
import Button from "@/app/_components/atoms/Button";
import { useToast } from "@/app/_components/atoms/Toast";

const existing = [
  {
    initials: "MG",
    author: "María García",
    date: "24 May",
    rating: 5,
    text: "El cheesecake de arándanos es lo mejor que probé en La Paz. Volveré sin duda.",
  },
  {
    initials: "RQ",
    author: "Rodrigo Q.",
    date: "22 May",
    rating: 5,
    text: "Los croissants recién horneados son increíbles. Servicio rápido y muy amable.",
  },
  {
    initials: "LT",
    author: "Lucía T.",
    date: "18 May",
    rating: 4,
    text: "Los macarons estaban deliciosos. Un poco de stock limitado pero vale la pena.",
  },
];

export default function ResenasPage() {
  const toast = useToast();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  function submit() {
    if (!rating || !text.trim()) {
      toast.show("Agrega una calificación y comentario");
      return;
    }
    toast.show("Reseña enviada ✓");
    setRating(0);
    setText("");
  }

  const avg = 4.8;

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      <div className="px-6 pb-4">
        <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-[1px] pb-1">Opiniones</p>
        <h1 className="font-display text-[22px] font-bold text-(--color-navy)">Reseñas de Clientes</h1>
      </div>

      {/* Rating summary */}
      <div className="mx-4 mb-5 bg-(--color-navy) rounded-[20px] px-5 py-5 flex items-center gap-5">
        <div className="text-center">
          <p className="font-display text-[48px] font-bold text-white leading-none">{avg}</p>
          <StarRating value={Math.round(avg)} readonly size="sm" />
          <p className="text-[10px] text-white/60 mt-1">{existing.length + 1} reseñas</p>
        </div>
        <div className="flex-1 flex flex-col gap-[6px]">
          {[5, 4, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <span className="text-[10px] text-white/70 w-3">{n}★</span>
              <div className="flex-1 h-[5px] bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-(--color-gold-2) rounded-full"
                  style={{ width: n === 5 ? "80%" : n === 4 ? "15%" : "5%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing reviews */}
      {existing.map((r) => (
        <ReviewCard key={r.author} {...r} />
      ))}

      {/* New review form */}
      <div className="mx-4 mb-6 bg-white border border-(--color-border) rounded-[18px] px-4 py-4">
        <p className="text-[13px] font-bold text-(--color-navy) mb-3">Deja tu reseña</p>
        <div className="mb-3">
          <p className="text-[11px] text-(--color-muted) mb-[6px]">Calificación</p>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué te pareció? Cuéntanos tu experiencia..."
          className="w-full bg-(--color-cream) border border-(--color-border) rounded-[12px] px-3 py-3 text-[12px] font-sans text-(--color-navy) placeholder:text-(--color-muted) outline-none resize-none h-[80px]"
        />
        <div className="mt-3">
          <Button variant="primary" onClick={submit}>
            Enviar reseña
          </Button>
        </div>
      </div>
    </div>
  );
}
