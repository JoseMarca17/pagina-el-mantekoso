type StepState = "done" | "current" | "pending";

interface TimelineStepProps {
  state: StepState;
  label: string;
  sub: string;
  isLast?: boolean;
}

export default function TimelineStep({ state, label, sub, isLast }: TimelineStepProps) {
  const dotStyle: Record<StepState, string> = {
    done: "bg-(--color-stock-ok) text-white",
    current: "bg-(--color-gold) text-white",
    pending: "bg-(--color-cream-2) border-2 border-(--color-border)",
  };
  const labelStyle: Record<StepState, string> = {
    done: "text-(--color-navy)",
    current: "text-(--color-gold)",
    pending: "text-(--color-muted)",
  };

  return (
    <div className="flex gap-[14px] pb-4 last:pb-0">
      <div className="flex flex-col items-center w-5 shrink-0">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${dotStyle[state]}`}>
          {state === "done" ? "✓" : state === "current" ? "●" : ""}
        </div>
        {!isLast && <div className="w-0.5 flex-1 min-h-3 bg-(--color-border) mt-[2px]" />}
      </div>
      <div className="flex-1 pt-[2px]">
        <div className={`text-[13px] font-bold ${labelStyle[state]}`}>{label}</div>
        <div className="text-[11px] text-(--color-muted) mt-[2px]">{sub}</div>
      </div>
    </div>
  );
}
