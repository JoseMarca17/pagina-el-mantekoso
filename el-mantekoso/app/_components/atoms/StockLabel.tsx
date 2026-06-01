type StockStatus = "ok" | "low" | "none";

interface StockLabelProps {
  status: StockStatus;
  count?: number;
}

const config: Record<StockStatus, { color: string; label: string }> = {
  ok: { color: "text-(--color-stock-ok)", label: "En stock" },
  low: { color: "text-(--color-stock-low)", label: "Poco stock" },
  none: { color: "text-(--color-stock-no)", label: "Sin stock" },
};

export default function StockLabel({ status, count }: StockLabelProps) {
  const { color, label } = config[status];
  return (
    <span className={`text-[9px] font-semibold ${color}`}>
      ● {label}
      {count !== undefined && status !== "none" ? ` (${count})` : ""}
    </span>
  );
}
