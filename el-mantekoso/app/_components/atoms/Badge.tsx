type BadgeVariant = "gold" | "navy";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export default function Badge({ children, variant = "gold" }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    gold: "bg-(--color-gold) text-white",
    navy: "bg-(--color-navy) text-white",
  };

  return (
    <span
      className={`inline-block ${variants[variant]} text-[9px] font-bold px-[10px] py-[3px] rounded-[20px] uppercase tracking-[0.8px]`}
    >
      {children}
    </span>
  );
}
