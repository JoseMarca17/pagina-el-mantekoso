import Image from "next/image";

const team = [
  {
    name: "Valentina Quiroz",
    role: "Maestra Pastelera",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Diego Mamani",
    role: "Chef de Masas",
    img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sofía Ticona",
    role: "Decoradora",
    img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=200&q=80",
  },
];

const values = [
  { icon: "🌿", title: "Sin conservantes", desc: "Elaboramos todo con ingredientes naturales frescos." },
  { icon: "⏰", title: "Hecho cada mañana", desc: "Nuestros productos se preparan cada día desde las 5am." },
  { icon: "💛", title: "Con amor", desc: "Cada pieza es artesanal y única, hecha con pasión." },
];

export default function NosotrosPage() {
  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-semibold text-(--color-navy)">
        <span>9:41</span>
        <span className="text-[10px]">▮▮ ≈ ▮</span>
      </div>

      {/* Hero */}
      <div className="relative mx-4 mb-6 rounded-[20px] overflow-hidden h-[180px]">
        <Image
          src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
          alt="El Mantekoso"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(27,46,75,0.6)] flex flex-col items-center justify-center">
          <p className="text-[10px] text-white/60 uppercase tracking-[2px]">Desde 2018</p>
          <h1 className="font-display text-[28px] font-bold text-white mt-1">El Mantekoso</h1>
          <p className="text-[12px] text-white/80">Pastelería Artesanal · La Paz</p>
        </div>
      </div>

      {/* Historia */}
      <div className="px-6 mb-6">
        <h2 className="font-display text-[18px] font-bold text-(--color-navy) mb-2">Nuestra Historia</h2>
        <p className="text-[13px] text-(--color-muted) leading-relaxed">
          Nacimos en 2018 en una pequeña cocina de Sopocachi con el sueño de llevar pasteles
          artesanales de calidad a La Paz. Hoy atendemos a cientos de familias paceñas que
          confían en nuestros ingredientes frescos y sabores únicos.
        </p>
      </div>

      {/* Valores */}
      <div className="px-6 mb-6">
        <h2 className="font-display text-[18px] font-bold text-(--color-navy) mb-3">Nuestros Valores</h2>
        <div className="flex flex-col gap-3">
          {values.map((v) => (
            <div key={v.title} className="flex items-start gap-3 bg-white border border-(--color-border) rounded-[14px] px-4 py-3">
              <span className="text-[24px] shrink-0">{v.icon}</span>
              <div>
                <p className="text-[13px] font-bold text-(--color-navy) mb-[2px]">{v.title}</p>
                <p className="text-[12px] text-(--color-muted)">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipo */}
      <div className="px-6 mb-6">
        <h2 className="font-display text-[18px] font-bold text-(--color-navy) mb-3">Nuestro Equipo</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col items-center shrink-0 w-[100px]">
              <Image
                src={m.img}
                alt={m.name}
                width={72}
                height={72}
                className="w-[72px] h-[72px] rounded-full object-cover mb-2 border-2 border-(--color-cream-2)"
              />
              <p className="text-[11px] font-bold text-(--color-navy) text-center">{m.name}</p>
              <p className="text-[10px] text-(--color-muted) text-center">{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ubicación */}
      <div className="mx-4 mb-6 bg-(--color-navy) rounded-[20px] px-5 py-5">
        <p className="text-[12px] font-bold text-white mb-1">📍 Encuéntranos</p>
        <p className="text-[13px] text-white/80">Calle de los Dulces #123, El Alto, La Paz</p>
        <p className="text-[12px] text-(--color-gold-2) mt-2">Lun–Sáb: 8:00 AM – 8:00 PM</p>
        <p className="text-[12px] text-(--color-gold-2)">Dom: 9:00 AM – 2:00 PM</p>
      </div>
    </div>
  );
}
