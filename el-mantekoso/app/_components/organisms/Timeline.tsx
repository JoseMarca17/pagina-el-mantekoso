import TimelineStep from "../molecules/TimelineStep";

const steps = [
  { label: "Pedido recibido", sub: "9:42 AM — Confirmado correctamente", state: "done" as const },
  { label: "En preparación", sub: "9:47 AM — Nuestros pasteleros trabajando", state: "done" as const },
  { label: "Casi listo", sub: "Decorando y empacando con cuidado", state: "current" as const },
  { label: "Listo para recoger", sub: "Te notificaremos por WhatsApp", state: "pending" as const },
];

export default function Timeline() {
  return (
    <div className="px-6">
      {steps.map((step, i) => (
        <TimelineStep
          key={step.label}
          state={step.state}
          label={step.label}
          sub={step.sub}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );
}
